import { SET_SHOP, SET_SHOP_IS_LOADING } from "./types";
import { initialShopReducerState } from "../reducers/ShopReducer";
import { BASE_SHOP_API_URL } from "../../constants";
import axios from "axios";
import { showSnackbar } from "./snackbar";
import { setIsLoading } from "./loader";

export function setShop(shop) {
    return { type: SET_SHOP, payload: shop };
}

export function setShopIsLoading(status) {
    return { type: SET_SHOP_IS_LOADING, payload: status };
}

export function getShop() {
    return function(dispatch) {
        dispatch(setShop(initialShopReducerState.shop));
        dispatch(setShopIsLoading(true));

        const url = BASE_SHOP_API_URL + '/shop/';
        axios.get(url)
        .then(response => {
            dispatch(setShop(response.data.data));
            dispatch(setShopIsLoading(false));
        })
        .catch(error => {
            dispatch(setShop(initialShopReducerState.shop));
            dispatch(setShopIsLoading(false));
        })
    }
}

export function updateShopServiceArea(service_area) {
    return function(dispatch) {
        const url = BASE_SHOP_API_URL + '/service-area';
        const data = { service_area };

        axios.post(url, data)
            .then(response => {
                dispatch(showSnackbar({ message: 'shop:service_area:update:success' }));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(showSnackbar({ message: 'shop:service_area:update:error', severity: 'error' }));
                dispatch(setIsLoading(false));
            });
    }
}
