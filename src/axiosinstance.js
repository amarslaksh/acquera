import axios from "axios";

const instance = axios.create({
    baseURL: 'https://swapi.dev/api/planets',
    headers: {
        'Content-Type': 'application/json'
    },
    
});

export default instance;