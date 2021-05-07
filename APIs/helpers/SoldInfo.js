const soldInfo={
    _allPlayers:[],
    _userWisePlayer:{},

    initialize(){
        this._allPlayers=[];
        this._userWisePlayer=new Object();
    },

    addSoldPlayer(player,userName){
        this._allPlayers.push(player);        
        if(this._userWisePlayer[userName]){
            this._userWisePlayer[userName].push(player);
        }else{
            this._userWisePlayer[userName]=[player]
        }
    },
    get getAllSoldPlayers(){
        return this._allPlayers;
    },
    getUserWisePlayer(userName){
        return this._userWisePlayer[userName] || [];
    }
}

export default soldInfo;