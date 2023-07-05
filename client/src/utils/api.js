import axios from 'axios';

const serverApi = 'http://localhost:5002/api';

export const getRoomExists = async (roomId) =>{
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
}

export const getTURNCredentials = async ()=>{
    const response = await axios.get(`${serverApi}/get-turn-credentials`);
    console.log(response.data);
    return response.data;
}