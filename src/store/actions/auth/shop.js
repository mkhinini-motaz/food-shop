import axios from 'axios';

import { shopUserAccessToken } from '../../../utils';
import { BASE_SHOP_API_URL } from '../../../constants';
import {
    SHOP_USER_LOGIN_SUCCESS,
    SHOP_USER_LOGOUT_SUCCESS,
    SHOP_USER_PROFILE_UPDATE_SUCCESS,
    SET_SHOP_USER_LOGIN_IS_LOADING, SET_SHOP_USER_LOGOUT_IS_LOADING,
    SET_SHOP_USER_PROFILE_UPDATE_IS_LOADING
} from '../types';
import { showSnackbar } from "../snackbar";

export function shopUserLoginSuccess(client) {
    return { type: SHOP_USER_LOGIN_SUCCESS, payload: client };
}

export function shopUserProfileUpdateSuccess(updatedClient) {
    return { type: SHOP_USER_PROFILE_UPDATE_SUCCESS, payload: updatedClient };
}

export function setShopUserLoginIsLoading(status) {
    return { type: SET_SHOP_USER_LOGIN_IS_LOADING, payload: status };
}

export function setShopUserLogoutIsLoading(status) {
    return { type: SET_SHOP_USER_LOGOUT_IS_LOADING, payload: status };
}

export function setShopUserProfileUpdateIsLoading(status) {
    return { type: SET_SHOP_USER_PROFILE_UPDATE_IS_LOADING, payload: status };
}

export function shopUserLogoutSuccess() {
    return { type: SHOP_USER_LOGOUT_SUCCESS };
}

export function attemptShopUserLogout() {
    return function(dispatch) {
        dispatch(setShopUserLogoutIsLoading(true));
        dispatch(shopUserLogoutSuccess());
        dispatch(setShopUserLogoutIsLoading(false));
    };
}

export function attemptShopUserLogin({ phone, password })  {
    return function(dispatch) {
        dispatch(setShopUserLoginIsLoading(true));
        axios.post(BASE_SHOP_API_URL + '/login', { phone, password })
            .then(response => {
                dispatch(shopUserLoginSuccess(response.data.data));
                dispatch(setShopUserLoginIsLoading(false));
            })
            .catch(error => {
// TODO: snackbar message
                dispatch(setShopUserLoginIsLoading(false));
            })
    }
}

export function fetchShopUserProfile()  {
    return function(dispatch) {
        axios.get(BASE_SHOP_API_URL + '/profile', { headers: { Authorization: shopUserAccessToken() } })
            .then(response => {
                dispatch(shopUserLoginSuccess({ ...response.data.data, access_token: localStorage.getItem('shop_user_access_token') }));
            })
            .catch(error => {
// TODO: snackbar message
            })
    }
}

export function updateShopUserProfile({ first_name, last_name, email, phone, phone_confirmation, password = null })  {
    return function(dispatch) {
        let data = { first_name, last_name, email, phone, phone_confirmation };
        if (password) {
            data.password = password;
        }

        axios.post(BASE_SHOP_API_URL + '/profile', data)
            .then(response => {
                dispatch(shopUserProfileUpdateSuccess(response.data.data));
                dispatch(setShopUserProfileUpdateIsLoading(false));
            })
            .catch(error => {
// TODO: snackbar message in middleware interceptor
                dispatch(setShopUserProfileUpdateIsLoading(false));
            })
    }
}

export function updateShopMenuLang({ menu_displayed_lang })  {
    return function(dispatch) {
        let data = { menu_displayed_lang };

// TODO: dispatch shop menu lang update is loading true
        axios.post(BASE_SHOP_API_URL + '/menu/lang', data)
            .then(response => {
                dispatch(showSnackbar({ message: 'menu:lang:update:title' }));
// TODO: dispatch shop menu lang update is loading false
            })
            .catch(error => {
// TODO: dispatch shop menu lang update is loading false
// TODO: snackbar message in middleware interceptor
                dispatch(setShopUserProfileUpdateIsLoading(false));
            })
    }
}
