import React, { useState,useEffect } from 'react';
import constants from '../../helpers/Constants';
import { getPrivilage } from '../../helpers/util';
import { Col ,Button} from 'react-bootstrap';


const LiveAuctionDetails = (props)=>{
    const currentPlayer = props.player

    
    const [bid,setBid] = useState(props.minBid)

    useEffect(() => {
        setBid(props.minBid)
    }, [props.minBid])

    const roundOff=(amt)=>{
        const bidAmt = Math.ceil(parseInt(amt.target.value)/5)*5;
        setBid(bidAmt);
    }
    const addPlayerSoldInfo = ()=>{
        if(currentPlayer.soldTo){
            return <>
                    <Col sm={12}>
                        {`Sold to : ${currentPlayer.soldTo}`}
                    </Col>
                    <Col sm={12}>
                        {`Sold for : ${currentPlayer.soldAt} points`}
                    </Col>
                </>
        }
        return <></>
    }

    const addBidInput=()=>{
        if(currentPlayer.soldTo){
            return <></>
        }
        return <Col sm={12}>
            <input style={{margin : '15px',marginLeft:'0px'}} type='number' step='5' 
                value={bid}
                placeholder='Bid Amount'
                onBlur={roundOff}
                onChange={event=>setBid(event.target.value)}/>
            <Button size='sm' onClick={()=>props.onBid(bid)}>
                Bid
            </Button>
        </Col>
    }

    const addSoldButtonAndGetNextPlayerButton = ()=>{
        const isPlayerSold = Boolean(currentPlayer.soldTo);
        const isUserCordinatorOrAbove = getPrivilage() >= constants.priviledges.CORDINATOR;
        const bidsPresent = currentPlayer && currentPlayer.bids && currentPlayer.bids.length && currentPlayer.bids.length>0 ? true : false;
        const soldButtonName = bidsPresent ? 'Mark as Sold' : 'Mark as Unsold';
        
        if(isUserCordinatorOrAbove){
            if(isPlayerSold){
                return <Col sm={12}>
                    <Button 
                        size='sm' 
                        variant="info" 
                        onClick={props.bringNextPlayerHandler}>
                            Get Next Player
                    </Button>
                </Col>
            }
            else{
                return <Col sm={12}>
                    <Button 
                        size='sm' 
                        variant="danger" 
                        onClick={props.markPlayerSoldHandler}>
                            {soldButtonName}
                    </Button>
                </Col>
            }
        }
        return <></>
    }

    return <>
            <Col sm={12}>
                {`PlayerId : ${currentPlayer.playerId}`}
            </Col>
            <Col sm={12}>
                {`Player Name : ${currentPlayer.name}`}
            </Col>
            <Col sm={12}>
                {`Team : ${currentPlayer.team}`}
            </Col>
            <Col sm={12}>
                {`Grade : ${currentPlayer.grade}`}
            </Col>
            {/* <Col sm={12}>
                {`Nationality : ${currentPlayer.nationality}`}
            </Col> */}
            <Col sm={12}> 
                {`Time Left : ${currentPlayer.timeLeft ? currentPlayer.timeLeft/1000-2: 'null'} Seconds`}
            </Col>
            {addPlayerSoldInfo()}
            {addBidInput()}
            {addSoldButtonAndGetNextPlayerButton()}
        </>
}

export default LiveAuctionDetails;