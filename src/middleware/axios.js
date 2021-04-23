import axios from 'axios';

export default function register() {
    axios.interceptors.request.use((config) => {
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('shop_user_access_token');

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // TODO: response interceptor to show error message
    // TODO: response interceptor to logout user on 403 response
}
