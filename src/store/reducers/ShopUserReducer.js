import { SET_SHOP_USERS, SET_SHOP_USERS_ARE_LOADING  } from '../actions';

export const initialOrderReducerState = {
    shopUsers: { data: [] },
    shopUsersAreLoading: false,
};

export default (state = initialOrderReducerState, action) => {
    if (action.type === SET_SHOP_USERS) {
        return { ...state, shopUsers: action.payload};
    }
    if (action.type === SET_SHOP_USERS_ARE_LOADING) {
        return { ...state, shopUsersAreLoading: action.payload};
    }

    return state;
};
