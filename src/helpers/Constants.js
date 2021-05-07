
const BASE_URL = 'http://localhost:8080/api';
// const BASE_URL = '/api';

const constants = {
    BASE_URL :'http://localhost:8080/api/',
    LIVE_POLL_TIME : 5000,
    POINTS_POLL_TIME : 60000,
    MYTEAM_POLL_TIME : 60000,
    urls: {
        getMyTeam: BASE_URL + '/myTeam',
        getPointsRemaining : BASE_URL + '/remaningPoints',
        getRemainingPlayers : BASE_URL + '/getRemainingPlayersCount',
        getLiveAuctionInfo : BASE_URL + '/liveAuctionInfo',
        placeBid : BASE_URL +'/addBid',
        markPlayerAsSold :BASE_URL +'/markAsSold',
        bringNextPlayer :BASE_URL +'/bringNextPlayer',
        getAllPlayersData :BASE_URL + '/allPlayers',
        startAuction : BASE_URL +'/resetAuction',
        toggleTimer : BASE_URL +'/toggleTimerEnabled',
        pauseTimer : BASE_URL +'/pauseTimer',
        startTimer: BASE_URL +'/startTimer',
        changeTimerForSold : BASE_URL +'/changeTimerWaitForSold',
        changeTImerForNextPlayer : BASE_URL +'/changeTimerWaitForNextPlayer',
        evaluation : BASE_URL +'/eval'
    },
    privileges:{
        INACTIVE_USER:1,
        ACTIVE_USER:2,
        CORDINATOR:3,
        ADMIN:4
    }
}


export default constants;
