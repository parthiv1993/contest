let router = require('express').Router();
const {checkIfCanBid,checkRoleRequired,createJwt,
        getLivePlayer,markAsSold,getRemainingPoints,getMyTeam,
        bringNextPlayer,resetAuction,getAllPlayers}  =require('./constants/CadnU');

router.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
 })
 

// This responds a POST request for the homepage
router.post('/login', function (req, res) {
    console.log(req.body.nickName)
    const token = createJwt(req.body.nickName);
    res.send({token});
})
 
router.get('/liveAuctionInfo',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth == true){
        res.send(getLivePlayer())
        return;
    }
    res.send(auth);
})

router.post('/addBid',function(req,res){
    const auth = checkRoleRequired(req,2)
    if(auth==true) {
        res.send(checkIfCanBid(req.body))
        return;
    }
    res.send(false);
})

router.post('/markAsSold',function(req,res){
    const auth = checkRoleRequired(req,3)
    if(auth==true) {
        res.send(markAsSold(req.body))
        return;
    }
    res.send(false);
})

router.get('/remaningPoints',function(req,res){
    const auth = checkRoleRequired(req,1)
    if(auth ==true){
        res.send(getRemainingPoints());
        return;  
    }
    res.send(false);
})

router.get('/myTeam',function(req,res){
    const auth = checkRoleRequired(req,2)
    if(auth ==true){ 
        res.send(getMyTeam(req));
        return;  
    }
    res.send(false);
})


router.get('/bringNextPlayer',function(req,res){
    const auth = checkRoleRequired(req,3)
    if(auth ==true){ 
        res.send(bringNextPlayer(req));
        return;  
    }
    res.send(false);
})

router.get('/resetAuction',function(req,res){
    const auth = checkRoleRequired(req,4)
    if(auth ==true){ 
        res.send(resetAuction());
        return;  
    }
    res.send(false);
})

router.get('/allPlayers',function(req,res){
    const auth = checkRoleRequired(req,2)
    if(auth ==true){ 
        res.send(getAllPlayers());
        return;  
    }
    res.send(false);
})


module.exports=router;