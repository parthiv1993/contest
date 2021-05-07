
import { users } from "../dataStores/Users.js"

const pointManager = {
    _currentPoints :{},

    initializePoints(){
        this._currentPoint = new Object();
        users.forEach(userObj=>{
            this._currentPoints[userObj.name] = 
                userObj.startingPoints;
        })
    },

    get currentPoints(){
        return Object.assign({},this._currentPoints)
    },

    deductPoints(userName='',points=0){
        const currentPoints = this._currentPoints[userName];
        if(currentPoints>points){
            this._currentPoints[userName] = currentPoints-points;
        }else{
            throw new Error('Invalid Deduction');
        }
    },
    getPointsForParticularUser(userName=''){
        return this.currentPoints[userName] || 0;
    }
}

export default  pointManager;