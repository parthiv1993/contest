import jwt from 'jsonwebtoken';

export const USER_KEY = 'IPL2021UserAuction2';
export const TOKEN_KEY = 'IPL2021TokenAuction2';
export const USER_PRIVILEGE = 'IPL2021PrivilegeAuction2';


export function getJwtToken(){
    return localStorage.getItem([TOKEN_KEY]);
}

export function checkForJwt(){
    return getJwtToken() ? true : false
}

export function saveJwt(token){
    try {
        const debugged = jwt.decode(token);
        console.log(debugged)
        if(debugged){
            localStorage.setItem([TOKEN_KEY],token);
            localStorage.setItem([USER_KEY],debugged.user);
            localStorage.setItem([USER_PRIVILEGE],debugged.privilege);
        }
    }
    catch(e){
        console.error(e);
    }
    
}

export function getPrivilege(){
    try{
        return Number(localStorage.getItem([USER_PRIVILEGE]))
    }
    catch(e){
        console.error(e);
        return 0;
    }
}
