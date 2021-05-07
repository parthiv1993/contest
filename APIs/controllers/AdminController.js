import express from 'express';
import BidRegulator from '../helpers/BidRegulator.js';
import { interceptors } from '../helpers/JwtHelper.js';
import playerGenerator from '../helpers/PlayerGenerator.js';
import pointManager from '../helpers/PointsManager.js';
import soldInfo from '../helpers/SoldInfo.js';
import timeKeeper from '../helpers/TimeKeeper.js';
const router = express.Router();

router.post('/resetAuction',interceptors.admin,(req,res)=>{
    pointManager.initializePoints();
    playerGenerator.initializePlayers();
    soldInfo.initialize();
    timeKeeper.initialize();
    BidRegulator.initialize();
    res.status(200);
    res.send('Success');
})

router.get('/bringNextPlayer',interceptors.cordinate,(req,res)=>{
    try{
        BidRegulator.drawAPlayer();
    }
    catch(e){
        res.status(400);
        res.send({message:e.message})
    }
})

router.post('/markAsSold',interceptors.cordinate,(req,res)=>{
    try{
        BidRegulator.markPlayerAsSold()
        res.send('Player marked as sold');
    }catch(e){
        res.status(400);
        res.send({message:e.message});
    }
})

router.get('/toggleTimerEnabled',interceptors.admin,(req,res)=>{
    try{
        timeKeeper.toggleTimer()
        const timerActive = timeKeeper._isTimerOn;
        res.send(`timer is now ${timerActive?'On':'Off'}`)

    }catch(e){
        res.status(400);
        res.send({message:e.message})
    }
})

export default router;