import jwt from 'jsonwebtoken';

export const USER_KEY = 'IPL2021User';
export const TOKEN_KEY = 'IPL2021Token';
export const USER_PRIVILAGE = 'IPL2021Privilage';


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
        console.log(debugged)
        if(debugged){
            localStorage.setItem([TOKEN_KEY],token);
            localStorage.setItem([USER_KEY],debugged.user);
            localStorage.setItem([USER_PRIVILAGE],debugged.privilage);
        }
        
    }
    catch(e){
        console.error(e);
    }
    
}


export function getPrivilage(){
    try{
        return localStorage.getItem([USER_PRIVILAGE])
    }
    catch(e){
        console.error(e);
        return 0;
    }
}

export function getHeaderObject(){
    const token = getJwtToken();

    return { 'headers': { 'Authorization': token } }
}