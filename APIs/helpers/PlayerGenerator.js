import _ from "lodash";
import { AllPlayers } from "../dataStores/PlayersData.js"

const UNSOLD_GROUP_LABEL = 'Z';
const playerGenerator = {
    _players :new Array(),
    _gradePlayers : {},
    specialPlayerId :-1,

    initializePlayers(){
        this._players= new Array();
        this._gradePlayers = new Object()
        AllPlayers.forEach(player=>{
                const copy = Object.assign({},player)
                this._players.push(copy)
                const playerGrade = player.grade;
                if(!this._gradePlayers[playerGrade]){
                    this._gradePlayers[playerGrade]=[]
                }
                this._gradePlayers[playerGrade].push(copy)
            }
        )
    },
    get allPlayer(){
        return _.cloneDeep(this._players);
    },
    get allGradePlayers(){
        return this._gradePlayers;
    },
    get allDifferentGradesSorted(){
        return Object.keys(this.allGradePlayers).sort()
    },

    get nextPlayerToAuction(){
        const gradeToPick = _.find(this.allDifferentGradesSorted,(grade)=>{
            return this.allGradePlayers[grade].length>0
        });
        
        let index = -1;
        const gradePlayers =this.allGradePlayers[gradeToPick];
        
        if(this.specialPlayerId){
            index = _.findIndex(gradePlayers,(obj)=>{
                obj.playerId == this.specialPlayerId
            })
            this.specialPlayerId=null;
        }
        if(index==-1){
            index = _.random(0,gradePlayers.length-1);

        }
        const player = gradePlayers.splice(index, 1);
        return player[0];
    },
    markPlayerAsUnsold(player){
        const unsoldGroup = this._gradePlayers[UNSOLD_GROUP_LABEL];
        if(!unsoldGroup){
            this._gradePlayers[UNSOLD_GROUP_LABEL]=[player];
        }else{
            unsoldGroup.push(player);
        }
    }
}

export default playerGenerator;