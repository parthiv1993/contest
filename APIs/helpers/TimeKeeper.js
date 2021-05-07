import { TIME_TO_AUCTION, TIME_TO_GET_NEXT_PLAYER } from "../APIConstants.js";
import BidRegulator from "./BidRegulator.js";

const timeKeeper={
    _isTimerOn : true,
    NEXT_PLAYER_INTERVAL : TIME_TO_GET_NEXT_PLAYER,
    AUCTION_TIME : TIME_TO_AUCTION,
    timerForAuction :-1,
    timerForNextPlayer : -1,
    timeRemainingToBid :0,
    timerForShowingRemainingTime:0,
    initialize(){
        this._isTimerOn =true;
        this.AUCTION_TIME= TIME_TO_AUCTION,
        this.NEXT_PLAYER_INTERVAL = TIME_TO_GET_NEXT_PLAYER
        clearInterval(this.timerForAuction);
        clearInterval(this.timerForNextPlayer);
        clearInterval(this.timerForShowingRemainingTime);
        this.timeRemainingToBid =0;
    },
    toggleTimer(){
        this._isTimerOn = !this._isTimerOn;
        clearInterval(this.timerForAuction);
        clearInterval(this.timerForNextPlayer);
        clearInterval(this.timerForShowingRemainingTime);
        this.timeRemainingToBid=0;
    },
    bidAdded(){
        if(this._isTimerOn){
            clearInterval(this.timerForAuction);
            this.timerForAuction = setInterval(()=>{
             BidRegulator.markPlayerAsSold()  
            },this.AUCTION_TIME)
            this.startDownwardCounter()
        }
    },
    playerSold(){
        if(this._isTimerOn){
            clearInterval(this.timerForAuction);
            this.timerForNextPlayer = setInterval(()=>{
                BidRegulator.drawAPlayer();
            },this.NEXT_PLAYER_INTERVAL)
        }
    },
    nextPlayerDrawn(){
        if(this._isTimerOn){
            clearInterval(this.timerForNextPlayer);
            this.timerForAuction = setInterval(()=>{
                BidRegulator.markPlayerAsSold()  
               },this.AUCTION_TIME)
               this.startDownwardCounter()
        }
    },
    startDownwardCounter(){
        clearInterval(this.timerForShowingRemainingTime);
        
        this.timeRemainingToBid = this.AUCTION_TIME;
        
        this.timerForShowingRemainingTime =setInterval(()=>{
            this.timeRemainingToBid = this.timeRemainingToBid-1000;
        },1000);
    },
    get timeReamining(){
        return this.timeRemainingToBid
    }

}
export default timeKeeper;