import { SET_CURRENT_ORDERS, SET_CURRENT_ORDERS_ARE_LOADING, } from '../actions';

export const initialOrderReducerState = {
    currentOrders: { data: [] },
    currentOrdersAreLoading: false,
};

export default (state = initialOrderReducerState, action) => {
    if (action.type === SET_CURRENT_ORDERS) {
        return { ...state, currentOrders: action.payload};
    }

    if (action.type === SET_CURRENT_ORDERS_ARE_LOADING) {
        return { ...state, currentOrdersAreLoading: action.payload};
    }

    return state;
};
