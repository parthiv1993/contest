let router = require('express').Router();
const {checkIfCanBidAndAddBid,checkRoleRequired,createJwt,
        getLivePlayer,markAsSold,getRemainingPoints,getMyTeam,
        bringNextPlayer,resetAuction,getAllPlayers,getRemainingPlayersCount,   
        clearTimer,startTimer,toggleTimerEnabled,changeTimerWaitForSold,
        changeTimerWaitForNextPlayer,getStatus,getSellingTimerValue,evaluate}  =require('./constants/CadnU');

router.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
 })
 

// This responds a POST request for the homepage
router.post('/login', function (req, res) {
    const token = createJwt(req.body.nickName);
    if(token){
        console.log(`logged in user -> ${req.body.nickName} ---> ${req.ip}`)
        res.send({token});
        return;
    }
    else{
        res.status(401);
        res.send({message:'Invalid Nickname'});
    }
})
 
router.get('/liveAuctionInfo',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth == true){
        const result = getLivePlayer();
        if(result){
            res.send(result);
            return;
        }
        res.status(400);
        res.send({message:'something went wrong'});
        return;
    }
    res.status(403);
    res.send({message:'You need authorization'});
})

router.post('/addBid',function(req,res){
    const auth = checkRoleRequired(req,2)
    if(auth==true) {
        const result = checkIfCanBidAndAddBid(req.body)
        if(result.success){
            res.send(result.body);
            return;
        }
        res.status(400);
        res.send({message:result.body});
        return;
    }
    res.status(403);
    res.send({message:'You need authorization'});
})

router.post('/markAsSold',function(req,res){
    const auth = checkRoleRequired(req,3)
    if(auth==true) {
        const result = markAsSold(req.body)
        if(result.success){
            res.send({message : result.message});
            return;
        }
        res.status(400);
        res.send({message:'something went wrong'});
        return;
    }
    res.status(403);
    res.send({message:'You don\'t have required roles'});
})

router.get('/remaningPoints',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth ==true){
        res.send(getRemainingPoints());
        return;  
    }
    res.status(403);
    res.send({message:'You have have access to points'});
})

router.get('/myTeam',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth ==true){ 
        res.send(getMyTeam(req));
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Team Players'});
})

router.get('/bringNextPlayer',function(req,res){
    const auth = checkRoleRequired(req,3)
    if(auth ==true){ 
        const result = bringNextPlayer();
        if(result.success){
            res.send(result.message);
            return;
        }
        res.status(400);
        res.send(result.message);
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Fetch Next player'});
})

router.get('/resetAuction',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(resetAuction());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to reset Auction'});
})

router.get('/allPlayers',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth ==true){ 
        res.send(getAllPlayers());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Fetch all players data'});
})

router.get('/getRemainingPlayersCount',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth ==true){ 
        res.send(getRemainingPlayersCount());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Fetch all players data'});
})

router.get('/pauseTimer',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(clearTimer());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Pause the timer'});
})

router.get('/startTimer',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(startTimer());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to start the timer'});
})

router.get('/toggleTimerEnabled',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(toggleTimerEnabled());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Toogle the timer'});
})

router.post('/changeTimerWaitForSold',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(changeTimerWaitForSold(req.body.timeWait));
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Toogle the timer'});
})

router.post('/changeTimerWaitForNextPlayer',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(changeTimerWaitForNextPlayer(req.body.timeWait));
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Toogle the timer'});
})

router.get('/getStatus',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(getStatus());
        return;  
    }
    res.status(403);
    res.send({message:'You do not have access to Toogle the timer'});
})

router.get('/getSellingTimerValue',function(req,res){
    const auth = checkRoleRequired(req,2)
    if(auth ==true){
        res.send(getSellingTimerValue());
        return;
    }
    res.send(403);
})

router.post('/eval',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){
        var command = req.body.command;
        var result = evaluate(command);
        res.send(JSON.stringify(result));
        return;
    }
    res.send(403);
})

// router.post('./setNextPlayer',function(req,res){
//     const auth = checkRoleRequired(req,4);
//     if(auth ==true){ 
//         res.send(setNextPlayer(req.body.playerId));
//         return;  
//     }
//     res.status(404);
// })


module.exports=router;