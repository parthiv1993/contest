var jwt = require('jsonwebtoken');
var allPlayerJson = require('./Allplayer');
var initialPoints = require('./points');

const userNames = {
    master : 'Parthiv',
    nikbaf : 'Nikhil',
    charsula : 'Shashank',
    ravvi : 'Ravi',
    stockabove : 'Vohera',
    chutiya : 'Prakash',
}

const privilege = {
    'Parthiv' : 4,
    'Nikhil' : 3,
    'Shashank' : 2,
    'Ravi' : 2,
    'Vohera' : 2,
    'Vishal': 2,
    'Prakash':2,
    'readOnly' : 1
}

var points=Object.assign({},initialPoints);

const PRIVATE_KEY = 'PRIVATE';

var remainingPlayer  = allPlayerJson;

var unsoldPlayer=[]

var soldPlayer = []

var livePlayer = new CreatePlayer(5,'virat',[{bidAmt:10,bidBy:'Parthiv'}],null,null,'rcb','A')


function CreatePlayer(playerId,name , bids , soldAt , soldTo , team , grade ) {
    this.playerId = playerId;
    this.name = name;
    this.bids = bids;
    this.soldAt = soldAt;
    this.soldTo = soldTo;
    this.team = team;
    this.grade = grade;
}

function createJwt(nickName) {
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
        const len = remainingPlayer.length;

        const ind = Math.floor(Math.random()*len);
        livePlayer = remainingPlayer.splice(ind,1)[0];
        return true;
    }
    return false;
}


function resetAuction(){
    remainingPlayer = allPlayerJson;
    points = initialPoints;
    soldPlayer = [];
    unsoldPlayer = [];
    const len = remainingPlayer.length;
    const ind = Math.floor(Math.random()*len);
    livePlayer = remainingPlayer.splice(ind,1)[0];
}

function getAllPlayers(){
    let players =[];
    players = players.concat(remainingPlayer);
    players = players.concat(soldPlayer);
    players = players.concat(unsoldPlayer);
    players.unshift(livePlayer);
    return players;
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
    getAllPlayers
}