import _ from 'lodash';
import privilegeMap from './PrivilegeMap.js';

class Users {
    constructor(id=0,name='',nickName='',privilege=1,startingPoints=1000){
        this.userId =id;
        this.name=name;
        this.nickName=nickName,
        this.privilege = privilege;
        this.startingPoints = startingPoints;
        this.isUser = this.privilege>=privilegeMap.ACTIVE_USER;
        this.isCordinator = this.privilege>=privilegeMap.CORDINATOR;
        this.isAdmin = this.privilege>=privilegeMap.ADMIN;
    }
}

export const users = Object.freeze([
    new Users(1,'Parthiv','master',4),
    new Users(2,'Nikhil','bafna',3)
])

