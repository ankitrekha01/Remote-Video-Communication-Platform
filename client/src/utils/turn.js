import * as api from "./api"

let TURNIceServers = null;

export const fetchTURNCredentials = async () =>{
    const responseData = await api.getTURNCredentials();

    if(responseData.token?.iceServers){
        // console.log(responseData.toke)
        TURNIceServers = responseData.token.iceServers;
    }
    return TURNIceServers;
}

export const getTURNIceServers = () =>{
    return TURNIceServers; 
}