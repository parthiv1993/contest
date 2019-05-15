import jwt from 'jsonwebtoken';

export const USER_KEY = 'WCAuction1User';
export const TOKEN_KEY = 'WCAuction1Token';


export function getJwtToken(){
    return localStorage.getItem([TOKEN_KEY]);
}

export function checkForJwt(){
    if(getJwtToken()){
        return true;
    }
    else{
        return false;
    }
}

export function saveJwt(token){
    try {
        const debugged = jwt.decode(token);
        if(debugged){
            localStorage.setItem([TOKEN_KEY],token);
            localStorage.setItem([USER_KEY],debugged.user)
        }
        
    }
    catch(e){
        console.error(e);
    }
    
}

export function getHeaderObject(){
    const token = getJwtToken();

    return { 'headers': { 'Authorization': token } }
}