import { SHOP_USER_LOGIN_SUCCESS, SHOP_USER_LOGOUT_SUCCESS, SHOP_USER_PROFILE_UPDATE_SUCCESS, SET_SHOP_USER_LOGIN_IS_LOADING, SET_SHOP_USER_PROFILE_UPDATE_IS_LOADING, PERSIST_REHYDRATE } from '../actions';

export const initialAuthReducerState = {
    authShopUser: { },
    shopUserLoginIsLoading: false,
    shopUserLogoutIsLoading: false,
    shopUserProfileUpdateIsLoading: false,
};

export default (state = initialAuthReducerState, action) => {
    if (action.type === PERSIST_REHYDRATE) {
        return action.payload ? action.payload.AuthReducer : state;
    }

    if (action.type === SHOP_USER_LOGIN_SUCCESS) {
        localStorage.setItem('shop_user_access_token', action.payload.access_token);
        return { ...state, authShopUser: action.payload };
    }

    if (action.type === SHOP_USER_LOGOUT_SUCCESS) {
        localStorage.setItem('shop_user_access_token', '');
        return { ...state, authShopUser: {} };
    }

    if (action.type === SHOP_USER_PROFILE_UPDATE_SUCCESS) {
        localStorage.setItem('shop_user_access_token', action.payload.access_token);
        return { ...state, authShopUser: action.payload }
    }

    if (action.type === SET_SHOP_USER_LOGIN_IS_LOADING) {
        return { ...state, shopUserLoginIsLoading: action.payload };
    }

    if (action.type === SET_SHOP_USER_PROFILE_UPDATE_IS_LOADING) {
        return { ...state, shopUserLogoutIsLoading: action.payload };
    }

    return state;
};
