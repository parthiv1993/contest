var jwt = require('jsonwebtoken');
var allPlayerJson = require('./Allplayer');
var initialPoints = require('./points');
var credentials = require('./credentials');
var Importprivilege =require('./Privileges')

const userNames = credentials;

const privilege = Importprivilege;

var points=Object.assign({},initialPoints);

const PRIVATE_KEY = 'PRIVATE';

// var remainingPlayer  = allPlayerJson;

var AGradePlayers = allPlayerJson.filter((player)=> player.grade=='A')
var BGradePlayers = allPlayerJson.filter((player)=> player.grade=='B')
var CGradePlayers = allPlayerJson.filter((player)=> player.grade=='C')
var DGradePlayers = allPlayerJson.filter((player)=> player.grade=='D')

var unsoldPlayer=[]

var soldPlayer = []

var livePlayer = {}


function CreatePlayer(playerId,name , bids , soldAt , soldTo , team , grade ) {
    this.playerId = playerId;
    this.name = name;
    this.bids = bids;
    this.soldAt = soldAt;
    this.soldTo = soldTo;
    this.team = team;
    this.grade = grade;
}

function createJwt(nickName = '') {
    const lowerNickName = nickName.toLowerCase();
    if(userNames[lowerNickName]){
        var token = jwt.sign({ user: userNames[lowerNickName]||'readOnly' },PRIVATE_KEY)
        return token;
    }
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
    return livePlayer;
}


function checkIfCanBid({bidAmt,bidBy,playerId}){
    if(livePlayer.playerId === playerId && !livePlayer.soldAt){
        
        if(livePlayer.bids.length==0 || livePlayer.bids[0].bidAmt<bidAmt) {
            
            if(points[bidBy]>=bidAmt){
                
                return addBid({bidAmt,bidBy,playerId});
            }
            console.log('you dont have enough points');
        }
        console.log('bid greater than previous bid');
    }
    console.log('player is not same or already sold');
    return false;
}

function addBid(bid){
    livePlayer.bids.unshift({
        bidBy:bid.bidBy,
        bidAmt:bid.bidAmt
    });
    return true;
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
            console.log(`Player with id ${playerId} sold to ${bidBy} for ${bidAmt}`)
            return true;
        }
        else{
            livePlayer.soldTo = 'unSold';
            unsoldPlayer.push(livePlayer);
            console.log(`Player with id ${playerId} remained unsold`)
            return true;
        }
    }
    console.log('player ID not matched');
    return false;
}

function getRemainingPoints(){
    return points;
}

function getMyTeam(request){
    try {
        const token = request.headers['authorization'];
        const res = jwt.verify(token,PRIVATE_KEY);
        const user = res.user; 
        return soldPlayer.filter(function(player){
            return player.soldTo === user
        });
    }
    catch(e){
        return e;
    }
}

function bringNextPlayer() {
    if(livePlayer.soldTo && livePlayer.soldTo.length>0){
        livePlayer = getNextPlayer();
        console.log(livePlayer);
        return true;
    }
    return false;
}

function getNextPlayer() {
    var len =null;
    if(AGradePlayers.length>0){
        len = AGradePlayers.length;
        const ind = Math.floor(Math.random()*len);
        return AGradePlayers.splice(ind,1)[0];
    }
    // if(BGradePlayers.length>0){
    //     len = BGradePlayers.length;
    //     const ind = Math.floor(Math.random()*len);
    //     return BGradePlayers.splice(ind,1)[0];
    // }
    // if(CGradePlayers.length>0){
    //     len = CGradePlayers.length;
    //     const ind = Math.floor(Math.random()*len);
    //     return CGradePlayers.splice(ind,1)[0];
    // }
    // if(DGradePlayers.length>0){
    //     len = DGradePlayers.length;
    //     const ind = Math.floor(Math.random()*len);
    //     return DGradePlayers.splice(ind,1)[0];
    // }
    if(unsoldPlayer.length>0){
        len = unsoldPlayer.length;
        const ind = Math.floor(Math.random()*len);
        const player = unsoldPlayer.splice(ind,1)[0];
        player.soldTo = null;
        console.log(player);
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
    players = players.concat(AGradePlayers);
    players = players.concat(BGradePlayers);
    players = players.concat(CGradePlayers);
    players = players.concat(DGradePlayers);
    players = players.concat(soldPlayer);
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

module.exports = {
    userNames,
    PRIVATE_KEY,
    createJwt,
    checkRoleRequired,
    getLivePlayer,
    checkIfCanBid,
    markAsSold,
    getRemainingPoints,
    getMyTeam,
    bringNextPlayer,
    resetAuction,
    getAllPlayers,
    getRemainingPlayersCount
}
