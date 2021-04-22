import axios from 'axios';

import { clientAccessToken } from '../../../utils';
import { BASE_CLIENT_API_URL } from '../../../constants';
import {
    CLIENT_LOGIN_SUCCESS,
    CLIENT_LOGOUT_SUCCESS,
    CLIENT_PROFILE_UPDATE_SUCCESS,
    SET_CLIENT_LOGIN_IS_LOADING, SET_CLIENT_LOGOUT_IS_LOADING,
    SET_CLIENT_PROFILE_UPDATE_IS_LOADING
} from '../types';

export function clientLoginSuccess(client) {
    return { type: CLIENT_LOGIN_SUCCESS, payload: client };
}

export function clientProfileUpdateSuccess(updatedClient) {
    return { type: CLIENT_PROFILE_UPDATE_SUCCESS, payload: updatedClient };
}

export function setClientLoginIsLoading(status) {
    return { type: SET_CLIENT_LOGIN_IS_LOADING, payload: status };
}

export function setClientLogoutIsLoading(status) {
    return { type: SET_CLIENT_LOGOUT_IS_LOADING, payload: status };
}

export function setClientProfileUpdateIsLoading(status) {
    return { type: SET_CLIENT_PROFILE_UPDATE_IS_LOADING, payload: status };
}

export function clientLogoutSuccess() {
    return { type: CLIENT_LOGOUT_SUCCESS };
}

export function attemptClientLogout() {
    return function(dispatch) {
        dispatch(setClientLogoutIsLoading(true));
        dispatch(clientLogoutSuccess());
        dispatch(setClientLogoutIsLoading(false));
    };
}

export function attemptClientLogin({ phone, password })  {
    return function(dispatch) {
        dispatch(setClientLoginIsLoading(true));
        axios.post(BASE_CLIENT_API_URL + '/login', { phone, password })
            .then(response => {
                dispatch(clientLoginSuccess(response.data.data));
                dispatch(setClientLoginIsLoading(false));
            })
            .catch(error => {
// TODO: snackbar message
                dispatch(setClientLoginIsLoading(false));
            })
    }
}

export function fetchClientProfile()  {
    return function(dispatch) {
        axios.get(BASE_CLIENT_API_URL + '/profile', { headers: { Authorization: clientAccessToken() } })
            .then(response => {
                dispatch(clientLoginSuccess(response.data.data));
            })
            .catch(error => {
// TODO: snackbar message
            })
    }
}

export function updateClientProfile({ first_name, last_name, email, phone, phone_confirmation, password = null })  {
    return function(dispatch) {
        let data = { first_name, last_name, email, phone, phone_confirmation };
        if (password) {
            data.password = password;
        }

        axios.post(BASE_CLIENT_API_URL + '/profile', data)
            .then(response => {
                dispatch(clientProfileUpdateSuccess(response.data.data));
                dispatch(setClientProfileUpdateIsLoading(false));
            })
            .catch(error => {
// TODO: snackbar message in middleware interceptor
                dispatch(setClientProfileUpdateIsLoading(false));
            })
    }
}
