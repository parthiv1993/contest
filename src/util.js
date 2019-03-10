import jwt from 'jsonwebtoken';

export function getJwtToken(){
    return localStorage.getItem('token');
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
            localStorage.setItem('token',token);
            localStorage.setItem('user',debugged.user)
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