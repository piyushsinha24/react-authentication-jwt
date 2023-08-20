import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});

// Interceptor will make the api call to fetch the access token automatically if the refresh token has expired
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});