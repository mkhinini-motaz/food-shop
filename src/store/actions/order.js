import axios from "axios";

import { BASE_SHOP_API_URL } from "../../constants";
import { SET_CURRENT_ORDERS, SET_CURRENT_ORDERS_ARE_LOADING, } from './types';

export function setCurrentOrdersAreLoading(status) {
    return { type: SET_CURRENT_ORDERS_ARE_LOADING, payload: status };
}

export function setCurrentOrders(orders) {
    return { type: SET_CURRENT_ORDERS, payload: orders };
}

export function getCurrentOrders({ page = 1, perPage = 20, orderBy = 'created_at', orderDirection = 'desc' })  {
    return function(dispatch) {
        dispatch(setCurrentOrdersAreLoading(true));
        const params = { page, perPage, orderBy, orderDirection };

        axios.get(BASE_SHOP_API_URL + '/order/current', { params })
            .then(response => {
                dispatch(setCurrentOrders(response.data));
                dispatch(setCurrentOrdersAreLoading(false));
            })
            .catch(error => {
                dispatch(setCurrentOrdersAreLoading(false));
            });
    }
}
