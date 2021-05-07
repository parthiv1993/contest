import express from 'express';
import { createJwt } from '../helpers/JwtHelper.js';

const router = express.Router();

router.post('/login',(req,res)=>{
    const nickName = req.body.nickName;
    const token = createJwt(nickName);
    if(token){
        res.status = 201;
        res.send({token});
    }
    else{
        res.status =401;
        res.send({message : 'Invalid User'});
    }
})

export default router;