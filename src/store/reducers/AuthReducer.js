import { CLIENT_LOGIN_SUCCESS, CLIENT_LOGOUT_SUCCESS, CLIENT_PROFILE_UPDATE_SUCCESS, SET_CLIENT_LOGIN_IS_LOADING, SET_CLIENT_PROFILE_UPDATE_IS_LOADING, PERSIST_REHYDRATE } from '../actions';

export const initialAuthReducerState = {
    authClient: { },
    clientLoginIsLoading: false,
    clientLogoutIsLoading: false,
    clientProfileUpdateIsLoading: false,
};

export default (state = initialAuthReducerState, action) => {
    if (action.type === PERSIST_REHYDRATE) {
        return action.payload ? action.payload.AuthReducer : state;
    }

    if (action.type === CLIENT_LOGIN_SUCCESS) {
        localStorage.setItem('client_access_token', action.payload.access_token);
        return { ...state, authClient: action.payload };
    }

    if (action.type === CLIENT_LOGOUT_SUCCESS) {
        localStorage.setItem('client_access_token', '');
        return { ...state, authClient: {} };
    }

    if (action.type === CLIENT_PROFILE_UPDATE_SUCCESS) {
        localStorage.setItem('client_access_token', action.payload.access_token);
        return { ...state, authClient: action.payload }
    }

    if (action.type === SET_CLIENT_LOGIN_IS_LOADING) {
        return { ...state, clientLoginIsLoading: action.payload };
    }

    if (action.type === SET_CLIENT_PROFILE_UPDATE_IS_LOADING) {
        return { ...state, clientLogoutIsLoading: action.payload };
    }

    return state;
};
