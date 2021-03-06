var jwt = require('jsonwebtoken');
var allPlayerJson = require('./Allplayer');
var initialPoints = require('./points');
var credentials = require('./credentials');
var Importprivilege =require('./Privileges')
var _ = require('lodash');
var fs = require('fs');

const userNames = credentials;

const privilege = Importprivilege;

var points=Object.assign({},initialPoints);

var hasAuctionStarted = false;

const PRIVATE_KEY = 'IPL-2021';

function copyArray(o) {
    var output, v, key;
    if(o){
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
            v = o[key];
            output[key] = (typeof v === "object") ? copyArray(v) : v;
        }
        return output;
    }
    return o;
 }


var Allplayers  = allPlayerJson;
// var remainingPlayers = copyArray(Allplayers);

var AGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='A');
var BGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='B');
var CGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='C');
var DGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='D');
var EGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='E');

var unsoldPlayers=[];

var soldPlayer = [];
var specialPlayerId = null;

var livePlayer = getNextPlayer();

var timerEnabled = true;
var timeOutToMarkPlayerSoldAfterBid = null;
var timeWaitToSold = 25000; //25 sec
var timeOutToGetNextPlayerAfterSold = null;
var timeWaitToBringNextPlayer = 10000; // 10 sec
var timeLeftInSoldTimer = null;
var intervalToDecreaseSoldTimer = null;

function startSellingTimer(playerId){
    clearAllTimers();
    if(timerEnabled){
        timeLeftInSoldTimer = timeWaitToSold
        intervalToDecreaseSoldTimer = setInterval(()=>{
            timeLeftInSoldTimer=timeLeftInSoldTimer-1000;
        },1000);
        timeOutToMarkPlayerSoldAfterBid = setTimeout(()=>{
            clearInterval(intervalToDecreaseSoldTimer);
            markAsSold({playerId})
        },timeWaitToSold);
    }
}

function startNextPlayerTimer(){
    clearAllTimers();
    clearAllTimers();
    if(timerEnabled){
        timeOutToGetNextPlayerAfterSold = setTimeout(()=>{
            bringNextPlayer()
        },timeWaitToBringNextPlayer);
    }
}

function clearAllTimers(){
    clearTimeout(timeOutToMarkPlayerSoldAfterBid);
    clearTimeout(timeOutToGetNextPlayerAfterSold);
    clearInterval(intervalToDecreaseSoldTimer);
    timeLeftInSoldTimer = null;
}

function createJwt(nickName = '') {
    const lowerNickName = nickName.toLowerCase();
    const user = userNames[lowerNickName] ;
    const privilage = privilege[user];
    if(user){
        var token = jwt.sign({ user,privilage},PRIVATE_KEY);
        return token;
    }
    return false;
}

function checkRoleRequired(request,requiredRole) {
    try {
        const token = request.headers['authorization'];
        const res = jwt.verify(token,PRIVATE_KEY);
        const user = res.user; 
        if(privilege[user]>=requiredRole) {
            return true
        }
        else {
            console.log('access denied')
            return false;
        }
    }
    catch(e){
        return e;
    }
}

function getLivePlayer(){
    return {...livePlayer,timeLeft:timeLeftInSoldTimer};
}

function checkIfCanBidAndAddBid({bidAmt,bidBy,playerId}){
    if(!hasAuctionStarted){
        return ({success:false,body:'Auction Not started yer'});
    }
    var body = ''
    if(livePlayer.playerId === playerId && !livePlayer.soldAt){

        if(true){ // livePlayer.basePrize<=bidAmt){
                if(livePlayer.bids.length==0 || livePlayer.bids[0].bidAmt<bidAmt) {
                    
                    if(points[bidBy]>=bidAmt){
                        
                        if(getPlayersOfUser(bidBy).length<20){
                            livePlayer.bids.unshift({
                                bidBy:bidBy,
                                bidAmt:bidAmt
                            });
                            if(timerEnabled){
                                startSellingTimer(playerId)
                            }
                            return({
                                success:true,
                                body : 'Bid Placed Successfully'
                            })
                            
                        }
                        body = 'you can not have more than 20 players';
                        return {success:false,body}
                    }
                    body = 'you dont have enough points'
                    return {success:false,body}
                }
                body = 'bid not greater than previous bid'
                return {success:false,body}
        }
        body = 'bid not greater than base prize';
        return {success:false,body}
    }
    body = 'player is not same or already sold'
    return {success:false,body};
}

function markAsSold({playerId}){
    if(!hasAuctionStarted){

        return ({success:false,message:'Auction Not started yer'});
    }
    if(livePlayer.playerId == playerId) {
        if(livePlayer.bids.length>0){
            bidBy = livePlayer.bids[0].bidBy;
            bidAmt = livePlayer.bids[0].bidAmt
            livePlayer.soldAt = bidAmt;
            livePlayer.soldTo = bidBy;
            soldPlayer.unshift(livePlayer);
            points[bidBy]=points[bidBy]-bidAmt;
            const message = `Player with id ${playerId} sold to ${bidBy} for ${bidAmt}`
            console.log(`Player with id ${playerId} sold to ${bidBy} for ${bidAmt}`)
            if(timerEnabled){
                startNextPlayerTimer();
            }
            updatePointsInFile()
            updateSoldPlayersInFile()
            return {success:true,message};
        }
        else
        {
            livePlayer.soldTo = 'unSold';
            unsoldPlayers.push(livePlayer);
            const message = `Player with id ${playerId} remained unsold`;
            updateUnsoldPlayersInFile()
            console.log(message);
            if(timerEnabled){
                startNextPlayerTimer();
            }
            updatePointsInFile()
            return {success:true,message};
        }
    }
    updatePointsInFile()
    return ({success:false,message:'player ID not matched'});
}

function getRemainingPoints(){
    return points;
}

function getMyTeam(request){
    try {
        const token = request.headers['authorization'];
        const res = jwt.verify(token,PRIVATE_KEY);
        const user = res.user; 
        return getPlayersOfUser(user)
    }
    catch(e){
        return e;
    }
}

function getPlayersOfUser(user){
    return soldPlayer.filter(function(player){
        return player.soldTo === user
    });
}

function bringNextPlayer() {
    if(!hasAuctionStarted){
        return ({success:false,message:'Auction Not started yer'});
    }
    if(livePlayer.soldTo && livePlayer.soldTo.length>0){
        try{
        livePlayer = getNextPlayer();
        const message = `Player with id ${livePlayer.playerId} is next Player`;
        startSellingTimer(livePlayer.playerId);
        return {success :true,message};
        }catch(e){
            console.error(e);
            return{success:false,message:'Something went wrong'};
        }
    }
    return {success:false,message:'Please sell the existing player or mark it unsold'};
}

function getNextPlayer() {

    const arr = getNextGradeOfPlayers();
    if(specialPlayerId){
        const index = _.findIndex(arr,function(player){
            return player.playerId == specialPlayerId
        })
        if(index!=-1){
            specialPlayerId = null;
            var player =  arr.splice(index,1)[0];
            console.log('Nxt player thanks to c is ');
            console.log(player.name);
            return player;
        }
    }
    else if(arr.length>0){
        const index = Math.floor(Math.random()*arr.length);
        const player = arr.splice(index,1)[0];
        player.soldTo = null;
        player.basePrize=0;
        return player;
    }
    return {}
}

function getNextGradeOfPlayers(){
    try {
        return [AGradePlayers,BGradePlayers,CGradePlayers,DGradePlayers,EGradePlayers,unsoldPlayers].find(function(arr){
            return arr.length>0
        }) || []
    }catch(e){
        console.error(e);
        return []
    }
}

function resetAuction(){
    // remainingPlayers = copyArray(Allplayers);
    AGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='A');
    BGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='B');
    CGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='C');
    DGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='D');
    EGradePlayers = copyArray(Allplayers).filter((player)=> player.grade=='E');
    points = Object.assign({},initialPoints);
    soldPlayer = [];
    unsoldPlayers = [];
    livePlayer = getNextPlayer()
    hasAuctionStarted = true
}

function getAllPlayers(){
    let players =[];
    players = players.concat(soldPlayer);
    // players = players.concat(remainingPlayers);
    players = players.concat(AGradePlayers);
    players = players.concat(BGradePlayers);
    players = players.concat(CGradePlayers);
    players = players.concat(DGradePlayers);
    players = players.concat(EGradePlayers);
    players = players.concat(unsoldPlayers);
    if(livePlayer && livePlayer.playerId){
        players.unshift(livePlayer);
    }
    return players;
}

function getRemainingPlayersCount() {
    var xmap={}

    copyArray([...AGradePlayers,...BGradePlayers,...CGradePlayers,...DGradePlayers,...EGradePlayers]).map(
        (player)=>{
            var team = player.team;
            if(xmap[team]){
                xmap[team] = xmap[team] + 1
            }else{
                xmap[team] = 1
            }
        }
    )


    var Unsold = unsoldPlayers.length;
    var Sold_Players = soldPlayer.length;
    var Total_Remaining = Allplayers.length-Sold_Players-Unsold;

    return {
        Sold_Players,
        ...xmap,
        Unsold,
        Total_Remaining
    }
}

function clearTimer(){
    clearAllTimers()
    return 'Timer Paused for player with player Id : '+livePlayer.playerId;
}

function startTimer(){
    if(livePlayer.playerId && !livePlayer.soldTo){
        startSellingTimer(livePlayer.playerId);
        return 'Timer started for Player with player id : '+livePlayer.playerId;
    }
    return false;
}

function toggleTimerEnabled(){
    timerEnabled = !timerEnabled;
    clearAllTimers();
    return 'Current status : Timer Enabled :'+timerEnabled;
}

function changeTimerWaitForSold(newtimeWait){
    timeWaitToSold = newtimeWait;
    return 'timeWaitToSold set to '+newtimeWait;
}

function changeTimerWaitForNextPlayer(newtimeWait){
    timeWaitToBringNextPlayer = newtimeWait;
    return 'timeWaitToBringNextPlayer set to '+newtimeWait;
}

function getStatus(){
    return {
        timerEnabled,
        hasAuctionStarted,
        timeOutToMarkPlayerSoldAfterBid:timeOutToMarkPlayerSoldAfterBid?true:false,
        timeWaitToSold,
        timeOutToGetNextPlayerAfterSold : timeOutToGetNextPlayerAfterSold?true:false,
        timeWaitToBringNextPlayer,
        userNames,
        privilege
    }
}

function getSellingTimerValue() {
    return timeLeftInSoldTimer;
}

function evaluate(command){
    try{
        console.log('evaluate command');
        console.log(JSON.stringify(command));
        return(eval(command))
    }
    catch(e){
        return(e)
    }
}
function updatePointsInFile(){
    try{
    var newValue =JSON.stringify(points);
    fs.writeFileSync('./points.txt', newValue, 'utf-8');

    console.log('readFileSync complete');
    }catch(e){
        console.warn(e)
    }
}
function updateSoldPlayersInFile(){
    try{
        fs.writeFileSync('./soldPlayers.txt', JSON.stringify(soldPlayer),'utf-8');
        console.log('soldPlayers data updated in text file');
    }catch(e){
        console.warn(e);
    }
}
function updateUnsoldPlayersInFile(){
    try{
        fs.writeFileSync('./unsoldPlayers.txt', JSON.stringify(unsoldPlayers),'utf-8');
        console.log('unsoldPlayers data updated in text file');
    }catch(e){
        console.warn(e);
    }
}

module.exports = {
    userNames,
    PRIVATE_KEY,
    createJwt,
    checkRoleRequired,
    getLivePlayer,
    checkIfCanBidAndAddBid,
    markAsSold,
    getRemainingPoints,
    getMyTeam,
    bringNextPlayer,
    resetAuction,
    getAllPlayers,
    getRemainingPlayersCount,
    clearTimer,
    startTimer,
    toggleTimerEnabled,
    changeTimerWaitForSold,
    changeTimerWaitForNextPlayer,
    getStatus,
    getSellingTimerValue,
    evaluate
}
