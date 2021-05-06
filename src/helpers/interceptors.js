import axios from 'axios';
import { getJwtToken } from './util';

export function setUpInterceptor(){
    axios.interceptors.request.use(addRequestHeader)
}

function addRequestHeader(request){
    request.headers['Authorization'] = getJwtToken();
    
    return request;
}