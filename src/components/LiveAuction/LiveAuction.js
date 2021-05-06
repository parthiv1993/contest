import React, { Component } from 'react';
import Constants from '../../helpers/Constants';
import { Button, Row,Card} from 'react-bootstrap';
import Axios from 'axios';
import {  USER_KEY } from '../../helpers/util';
import _ from 'lodash';
import { toast } from 'react-toastify';
import constants from '../../helpers/Constants';
import DisplayAddedBids from './DisplayAddedBids';
import LiveAuctionDetails from './DisplayLiveAuctionDetails';

class LiveAuction extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentAuctionInfo : null,
            bidAmt : 5
        }
    }

    componentDidMount(){
        this.getLiveAuctionInfo();
        this.interval = setInterval(()=>{
            this.getLiveAuctionInfo();
        },Constants.LIVE_POLL_TIME)
    }
    componentWillUnmount(){
        window.clearInterval(this.interval);
    }
    
    getLiveAuctionInfo(){
        Axios.get(constants.urls.getLiveAuctionInfo).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.currentAuctionInfo)){
                    const bidAmt = (res.data.bids && res.data.bids[0] && res.data.bids[0].bidAmt+5) || 5;
                    this.setState({currentAuctionInfo:res.data,bidAmt})
                }
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
            }
        )
    }

    roundOff(amt){
        const bidAmt = Math.ceil(parseInt(amt.target.value)/5)*5;
        this.setState({bidAmt});
    }

    handleBidInputChange(e){
        this.setState({bidAmt:e.target.value});
    }


    bid(bidAmt){
        if(bidAmt && bidAmt>0){
            const userName = localStorage.getItem([USER_KEY]) || 'User';
            const playerId =this.state.currentAuctionInfo.playerId;
            this.doBidRequest(playerId,bidAmt,userName).then(
                ()=>this.getLiveAuctionInfo()
                ,(err)=>{
                    if(err && err.response && err.response.data && err.response.data.message){
                        toast.error(err.response.data.message);
                      } 
                }
            )
        }
    }

    doBidRequest(playerId,bidAmt,bidBy){
        return Axios.post(Constants.urls.placeBid,{playerId,bidAmt,bidBy})
    }

    markPlayerSoldHandler(){
        this.markPlayerSoldRequest(this.state.currentAuctionInfo.playerId).then(
            (res)=>{
                if(res.data && res.data.message){
                    toast.success(res.data.message)
                }
                this.getLiveAuctionInfo();
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
                console.error(err);
            }
        )
    }

    markPlayerSoldRequest(playerId){
        return Axios.post(Constants.urls.markPlayerAsSold,{playerId});
    }
    
    bringNextPlayerHandler(){
        this.bringNextPlayerRequest().then(
            ()=> this.getLiveAuctionInfo()
            ,err=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
            }
        )
    }
    bringNextPlayerRequest(){
        return Axios.get(Constants.urls.bringNextPlayer);
    }

    onRefreshHandler(){
        this.getLiveAuctionInfo();
    }

    render() {
        const currentPlayer = this.state.currentAuctionInfo;
        if(currentPlayer){
            return(
                <Card>
                    <Card.Header>
                        Current/ Last Player
                        <Button 
                            variant="dark" 
                            size='sm' 
                            style={{float:'right'}} 
                            onClick={this.onRefreshHandler.bind(this)}>
                                Refresh
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Row style={{margin:'0px'}}>
             

                            <LiveAuctionDetails
                                player = {currentPlayer}
                                minBid = {this.state.bidAmt}
                                onBid = {(bidAmt)=>this.bid(bidAmt)}
                                bringNextPlayerHandler = {this.bringNextPlayerHandler.bind(this)}
                                markPlayerSoldHandler = {this.markPlayerSoldHandler.bind(this)}

                                ></LiveAuctionDetails>
                            <DisplayAddedBids bids={currentPlayer.bids}></DisplayAddedBids>
                        </Row>
                    </Card.Body>
                </Card>
            )
        }
        else{
            return null;
        }
    }
}

export default LiveAuction;
