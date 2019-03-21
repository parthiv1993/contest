import jwt from 'jsonwebtoken';

export function getJwtToken(){
    return localStorage.getItem('token2');
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
            localStorage.setItem('token2',token);
            localStorage.setItem('user2',debugged.user)
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