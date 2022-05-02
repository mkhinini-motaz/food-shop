import axios from "axios";

import { BASE_SHOP_API_URL } from "../../constants";
import { SET_CURRENT_ORDERS, SET_CURRENT_ORDERS_ARE_LOADING, SET_ORDER_STATUS_UPDATE_IS_LOADING, } from './types';
import { showSnackbar } from "./snackbar";
import { hideOrderStatusEditDialog } from "./orderStatusEditDialog";
import { hideTransporterDialog } from "./transporterDialog";

export function setCurrentOrdersAreLoading(status) {
    return { type: SET_CURRENT_ORDERS_ARE_LOADING, payload: status };
}

export function setCurrentOrders(orders) {
    return { type: SET_CURRENT_ORDERS, payload: orders };
}

export function setOrderStatusUpdateIsLoading(status) {
    return { type: SET_ORDER_STATUS_UPDATE_IS_LOADING, payload: status };
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

export function attachTransporterToOrder(orderId, transporterId)  {
    return function(dispatch) {
        const data = { transporter_id: transporterId };

        axios.post(BASE_SHOP_API_URL + '/order/' + orderId + '/transporter', data)
            .then(response => {
                dispatch(showSnackbar({ message: 'order:transporter:attach:success' }));
                dispatch(getCurrentOrders({}));
                dispatch(hideTransporterDialog());
            })
            .catch(error => {
                dispatch(showSnackbar({ message: 'order:transporter:attach:error', severity: 'error' }));
            });
    }
}

export function updateOrderStatus(orderId, status)  {
    return function(dispatch) {
        dispatch(setOrderStatusUpdateIsLoading(true));

        const data = { status };
        axios.post(BASE_SHOP_API_URL + '/order/' + orderId + '/status', data)
            .then(response => {
                dispatch(showSnackbar({ message: 'order:status:update:success' }));
                dispatch(getCurrentOrders({}));
                dispatch(hideOrderStatusEditDialog());
                dispatch(setOrderStatusUpdateIsLoading(false));
            })
            .catch(error => {
                dispatch(showSnackbar({ message: 'order:status:update:error', severity: 'error' }));
                dispatch(setOrderStatusUpdateIsLoading(false));
            });
    }
}

export function updateOrderIsPayed(orderId, isPayed)  {
    return function(dispatch) {
        const data = { is_payed: isPayed };
        axios.post(BASE_SHOP_API_URL + '/order/' + orderId + '/is-payed', data)
            .then(response => {
                dispatch(showSnackbar({ message: 'order:is_payed:update:success' }));
                dispatch(getCurrentOrders({}));
            })
            .catch(error => {
                dispatch(showSnackbar({ message: 'order:is_payed:update:error', severity: 'error' }));
            });
    }
}
