const BASE_URL = (process.env.REACT_APP_ENV && String(process.env.REACT_APP_ENV) === "dev") ? "http://localhost:8080" : "https://duplify-app.onrender.com";
export const CLIENT_URL = (process.env.REACT_APP_ENV && String(process.env.REACT_APP_ENV) === "dev") ? "http://localhost:3000": 'http://duplify.s3-website-us-west-1.amazonaws.com';

export const BACKEND_ENDPOINTS = {
    ROOT: BASE_URL + '/',
    USER: BASE_URL + '/user',
    AUTHORIZE: BASE_URL + '/oauth/authorize',
    FETCH_PLAYLIST: BASE_URL + '/playlist/',
    CREATE_PLAYLIST: BASE_URL + '/playlist/create',
}

