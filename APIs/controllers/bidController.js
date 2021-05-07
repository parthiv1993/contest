import express from 'express';
import BidRegulator from '../helpers/BidRegulator.js';
import { getRequestingUser, interceptors } from '../helpers/JwtHelper.js';
import timeKeeper from '../helpers/TimeKeeper.js';
const router = express.Router();

router.get('/liveAuctionInfo',interceptors.user,(req,res)=>{
    try{
        const currentPlayer = BidRegulator.currentPlayer;
        const timeLeft  = timeKeeper.timeReamining;
        const player = {
            ...currentPlayer,
            timeLeft
        }
        res.send(player);
    }catch(e){
        res.status(400);
        res.send('some thing went wrong'+e);
    }
})

router.post('/addBid',interceptors.user,(req,res)=>{
    try{
        const user = getRequestingUser(req);
        const playerId = req.body.playerId;
        const bidAmt = req.body.bidAmt;
        BidRegulator.checkAndAddBid(user,playerId,bidAmt);

        res.send('Bid added successfully');
    }catch(e){
        res.status(400);
        res.send({message:e.message});
    }
})

export default router;
