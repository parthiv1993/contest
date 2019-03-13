var jwt = require('jsonwebtoken');
var allPlayerJson = require('./Allplayer');
var initialPoints = require('./points');
var credentials = require('./credentials');
var Importprivilege =require('./Privileges')

const userNames = credentials;

const privilege = Importprivilege;

var points=Object.assign({},initialPoints);

const PRIVATE_KEY = 'PRIVATE';


var Allplayers  = allPlayerJson;

var AGradePlayers = allPlayerJson.filter((player)=> player.grade=='A');
var BGradePlayers = allPlayerJson.filter((player)=> player.grade=='B');
var CGradePlayers = allPlayerJson.filter((player)=> player.grade=='C');
var DGradePlayers = allPlayerJson.filter((player)=> player.grade=='D');

var unsoldPlayer=[];

var soldPlayer = [];

var livePlayer = getNextPlayer();

var timerEnabled = true;
var timeOutToMarkPlayerSoldAfterBid = null;
var timeWaitToSold = 45000; //45 sec
var timeOutToGetNextPlayerAfterSold = null;
var timeWaitToBringNextPlayer = 60000; // 60 sec
var timeLeftInSoldTimer = null;
var intervalToDecreaseSoldTimer = null;

function startSellingTimer(playerId){
    clearAllTimers()
    timeLeftInSoldTimer = timeWaitToSold
    intervalToDecreaseSoldTimer = setInterval(()=>{
        timeLeftInSoldTimer=timeLeftInSoldTimer-1000;
        console.log(timeLeftInSoldTimer)
    },1000);
    timeOutToMarkPlayerSoldAfterBid = setTimeout(()=>{
        clearInterval(intervalToDecreaseSoldTimer);
        markAsSold({playerId})
    },timeWaitToSold);
}

function startNextPlayerTimer(){
    clearAllTimers()
    timeOutToGetNextPlayerAfterSold = setTimeout(()=>{
        bringNextPlayer()
    },timeWaitToBringNextPlayer);
}

function clearAllTimers(){
    clearTimeout(timeOutToMarkPlayerSoldAfterBid);
    clearTimeout(timeOutToGetNextPlayerAfterSold);
    clearInterval(intervalToDecreaseSoldTimer);
    timeLeftInSoldTimer = null;
}

function createJwt(nickName = '') {
    const lowerNickName = nickName.toLowerCase();
    if(userNames[lowerNickName]){
        var token = jwt.sign({ user: userNames[lowerNickName]||'readOnly' },PRIVATE_KEY)
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
    var body = ''
    if(livePlayer.playerId === playerId && !livePlayer.soldAt){
        
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
    body = 'player is not same or already sold'
    return {success:false,body};
}

function markAsSold({playerId}){
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
            return {success:true,message};
        }
        else{
            livePlayer.soldTo = 'unSold';
            unsoldPlayer.push(livePlayer);
            const message = `Player with id ${playerId} remained unsold`;
            console.log(message);
            if(timerEnabled){
                startNextPlayerTimer();
            }
            return {success:true,message};
        }
    }
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
    if(livePlayer.soldTo && livePlayer.soldTo.length>0){
        livePlayer = getNextPlayer();
        const message = `Player with id ${livePlayer.playerId} is next Player`;
        startSellingTimer(livePlayer.playerId);
        return {success :true,message};
    }
    return {success:false,message:'Please sell the existing player or mark it unsold'};
}

function getNextPlayer() {
    var len =null;
    if(AGradePlayers.length>0){
        len = AGradePlayers.length;
        const ind = Math.floor(Math.random()*len);
        return AGradePlayers.splice(ind,1)[0];
    }
    if(BGradePlayers.length>0){
        len = BGradePlayers.length;
        const ind = Math.floor(Math.random()*len);
        return BGradePlayers.splice(ind,1)[0];
    }
    if(CGradePlayers.length>0){
        len = CGradePlayers.length;
        const ind = Math.floor(Math.random()*len);
        return CGradePlayers.splice(ind,1)[0];
    }
    if(DGradePlayers.length>0){
        len = DGradePlayers.length;
        const ind = Math.floor(Math.random()*len);
        return DGradePlayers.splice(ind,1)[0];
    }
    if(unsoldPlayer.length>0){
        len = unsoldPlayer.length;
        const ind = Math.floor(Math.random()*len);
        const player = unsoldPlayer.splice(ind,1)[0];
        player.soldTo = null;
        return player;
    }
}

function resetAuction(){
    AGradePlayers = allPlayerJson.filter((player)=> player.grade=='A')
    BGradePlayers = allPlayerJson.filter((player)=> player.grade=='B')
    CGradePlayers = allPlayerJson.filter((player)=> player.grade=='C')
    DGradePlayers = allPlayerJson.filter((player)=> player.grade=='D')
    points = initialPoints;
    soldPlayer = [];
    unsoldPlayer = [];
    livePlayer = getNextPlayer()
}

function getAllPlayers(){
    let players =[];
    players = players.concat(soldPlayer);
    players = players.concat(AGradePlayers);
    players = players.concat(BGradePlayers);
    players = players.concat(CGradePlayers);
    players = players.concat(DGradePlayers);
    players = players.concat(unsoldPlayer);
    if(livePlayer && livePlayer.playerId){
        players.unshift(livePlayer);
    }
    return players;
}

function getRemainingPlayersCount() {
    var A = AGradePlayers.length;
    var B = BGradePlayers.length;
    var C = CGradePlayers.length;
    var D = DGradePlayers.length;
    var Unsold = unsoldPlayer.length;
    var Total_Remaining = A+B+C+D+Unsold;
    var Sold_Players = soldPlayer.length;
    return {
        Sold_Players,A,B,C,D, Unsold,Total_Remaining
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
    getSellingTimerValue
}
