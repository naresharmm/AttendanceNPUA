import axios from 'axios';
import * as auth from '../helpers/auth';

function errors() {
    axios.interceptors.response.use(undefined, (error) => {
        if (error.response.status === 401) {
            auth.removeToken();

            // Exclude login request
            if (error.response.config.url !== '/api/login') {
                window.location.reload();
            }
        }

        return Promise.reject(error);
    });
}

export default errors;