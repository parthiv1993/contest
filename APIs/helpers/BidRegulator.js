import { MAX_PLAYER_PER_USER } from "../APIConstants.js";
import playerGenerator from "./PlayerGenerator.js";
import pointManager from "./PointsManager.js";
import soldInfo from "./SoldInfo.js";
import timeKeeper from "./TimeKeeper.js";

const BidRegulator={
    _currentPlayer :null,
    initialize(){
        this._currentPlayer=null;
        this.drawAPlayer();
    },
    drawAPlayer(){
        if(this.currentPlayer){
            throw new Error('Player already present');
        }
        this._currentPlayer = playerGenerator.nextPlayerToAuction;
        console.log('player drawn',this.currentPlayer);
        timeKeeper.nextPlayerDrawn()
    },
    get currentPlayer(){
        return this._currentPlayer;
    },
    markPlayerAsSold(){
        if(!this.currentPlayer){
            throw new Error('No Player to mark as sold');
        }
        const hasBids = this.getHighestBid()>0;
        if(hasBids){
            const lastBid = this._currentPlayer.bids[0];
            pointManager.deductPoints(lastBid.bidBy,lastBid.bidAmt);
            this._currentPlayer.soldAt =lastBid.bidAmt;
            this._currentPlayer.soldTo = lastBid.bidBy;
            soldInfo.addSoldPlayer(this.currentPlayer,lastBid.bidBy);
            console.log('marking as sold',this.currentPlayer)
            timeKeeper.playerSold()
            this._currentPlayer=null
        }else{
            playerGenerator.markPlayerAsUnsold(this.currentPlayer);
            console.log('marking as unsold',this.currentPlayer)
            timeKeeper.playerSold()
            this._currentPlayer=null
        }

    },

    checkAndAddBid(user,playerId,bidAmt){

        if(!this.currentPlayer){
            throw new Error('No player to bid on');
        }
        if(this.currentPlayer && this.currentPlayer.playerId != playerId){
            throw new Error('Player is not the same you are bidding on')
        }
        if(this.currentPlayer.soldAt){
            throw new Error('Player already marked as Sold');
        }
        if(this.getHighestBid()>=bidAmt){
            throw new Error('Bid not larger than previous Bid');
        }
     
        const pointsAvailableForUser = pointManager.getPointsForParticularUser(user.name);
        if(pointsAvailableForUser<bidAmt){
            throw new Error('You dont have suffiecient points');
        }
        const playersAlreadySoldToUser = soldInfo.getUserWisePlayer(user.name);
        if(playersAlreadySoldToUser.length>= MAX_PLAYER_PER_USER){
            throw new Error('You dont have enough player solts');
        }
        this.addBid(user,bidAmt)

    },
    addBid(user,bidAmt){
        this.currentPlayer.bids.unshift({
            bidAmt,bidBy:user.name
        })
        console.log('adding bid');
        timeKeeper.bidAdded();
    },
    getHighestBid(){
        if(this.currentPlayer && 
            this.currentPlayer.bids && 
            this.currentPlayer.bids[0] && 
            this.currentPlayer.bids[0].bidAmt){
                return this.currentPlayer.bids[0].bidAmt
            }
        return 0
    }

}

export default BidRegulator;