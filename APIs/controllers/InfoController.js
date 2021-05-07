import { getRequestingUser, interceptors, readJWT } from '../helpers/JwtHelper.js';
import pointManager from '../helpers/PointsManager.js';
import express from 'express';
import playerGenerator from '../helpers/PlayerGenerator.js';
import soldInfo from '../helpers/SoldInfo.js';
import _ from 'lodash';

const router = express.Router();

router.get('/remaningPoints',interceptors.user,
    (request,response)=>{
        response.send(pointManager.currentPoints)
    }
)

router.get('/allPlayers',interceptors.user,(req,res)=>{
    res.send(playerGenerator.allPlayer)
})

router.get('/myTeam',interceptors.user,(req,res)=>{
    try{
        const user= getRequestingUser(req)
        const playersSoldToUser = soldInfo.getUserWisePlayer(user.name);
        res.send(playersSoldToUser)

    }catch(e){
        res.sendStatus(400)
    }
})

router.get('/getRemainingPlayersCount',interceptors.user,(req,res)=>{
    try{
        const summary={};
        
        const allGradesPlayers = playerGenerator.allGradePlayers
        _.map(allGradesPlayers,(value,key)=>{
            summary[key]=value.length;
        })
        summary.Sold = soldInfo.getAllSoldPlayers.length;

        console.log(summary);
        res.send(summary);
    }
    catch(e){
        res.status(400);
        res.send({message:e.message});
    }
})

export default router;