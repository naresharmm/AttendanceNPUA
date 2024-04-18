import axios from 'axios';
import * as auth from '../helpers/auth';

function authHeader() {
    axios.interceptors.request.use(function (config) {
        const token = auth.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}

export default authHeader;