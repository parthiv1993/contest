import { users } from "../dataStores/Users.js"
import _ from 'lodash';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'IPL-2021'

export const createJwt = (nickName)=>{
    const user = _.find(users,(userObj)=>{
        return _.isEqual(userObj.nickName,nickName)
    })
    if(user){
        const payload= {
            user : user.name,
            privilege : user.privilege,
            userId:user.userId
        }
        const token = jwt.sign(payload,PRIVATE_KEY,{
            expiresIn:'1d'
        })
        return token;
    }
    return null;
}

export const readJWT = (token)=>{
    try{
        const payload = jwt.verify(token,PRIVATE_KEY);
        const signedInUser = _.find(users,(userObj)=>{
            return userObj.userId == payload.userId;
        })
        return signedInUser;
    }catch(e){
        return null;
    }
}

export const getRequestingUser = (req)=>{
    try{
        const authHeader = req.headers.authorization;
        const user = readJWT(authHeader);
        return user;
    }catch(e){
        return null
    }
}

const adminLevelInterceptor = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const user = readJWT(authHeader);
        if(user.isAdmin){
            next()
        }else{
            res.status(401);
            res.send();
        }
    }catch(e){
        res.status(401)
        res.send('Invalid User')
    }
};
const cordinatorLevelInterceptor = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try{
        const user = readJWT(authHeader);
        if(user.isCordinator){
            next()
        }else{
            res.status(401);
            res.send();
        }
    }catch(e){
        res.status(401)
        res.send('Invalid User')
    }
};
const activeUserLevelInterceptor = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try{
        const user = readJWT(authHeader);
        if(user.isUser){
            next()
        }else{
            res.status(401);
            res.send();
        }
    }catch(e){
        res.status(401)
        res.send('Invalid User')
    }
};
export const interceptors={
    admin : adminLevelInterceptor,
    cordinate : cordinatorLevelInterceptor,
    user : activeUserLevelInterceptor
}