import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const instance = axios.create({
    baseURL: "",
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;