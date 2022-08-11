import axios from "axios";

import {BASE_SHOP_API_URL, SHOP_ID} from "../../constants";
import {
    SET_CART_PRODUCT_TYPE_FIXED,
    CREATE_CART_PRODUCT_WITH_OPTIONS,
    SET_CART_PRODUCTS,
    SET_CART_ADDRESS,
    SET_CART_PROMO_CODE,
    SET_CART_PROMO_CODE_IS_LOADING,
    DELETE_CART_PRODUCT_WITH_OPTIONS,
    SET_ADDITIONAL_NOTE,
    SET_ORDER_SUBMIT_IS_LOADING,
    SET_ORDER_IN_PROGRESS,
    EMPTY_CART,
    UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS,
    SET_IS_PAYED, SET_ORDER_TIMESTAMP, SET_TYPE, SET_SOURCE, SET_ASSOCIATED_PHONE
} from './types';
import { showSnackbar } from "./snackbar";
import { cartReducerDataToOrderSubmitData } from "../../utils";
import { attemptShopUserLogout } from "./auth/shop";

export function setCartProductTypeFixed({ product_id, product_count }) {
    return { type: SET_CART_PRODUCT_TYPE_FIXED, payload: { product_id, product_count } };
}

export function setCartProductTypeWithOptions({ product_id, product_count, options }) {
    return { type: CREATE_CART_PRODUCT_WITH_OPTIONS, payload: { product_id, product_count, options } };
}

export function deleteCartProductTypeWithOptions(product_id_in_cart) {
    return { type: DELETE_CART_PRODUCT_WITH_OPTIONS, payload: product_id_in_cart };
}

export function updateCountCartProductTypeWithOptions({ product_id_in_cart, product_count }) {
    return { type: UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS, payload: { product_id_in_cart, product_count } };
}

export function setCartProducts(productInfos) {
    return { type: SET_CART_PRODUCTS, payload: productInfos };
}

export function setCartAddress(address) {
    return { type: SET_CART_ADDRESS, payload: address };
}

export function setCartPromoCode(promoCode) {
    return { type: SET_CART_PROMO_CODE, payload: promoCode };
}

export function setCartPromoCodeIsLoading(status) {
    return { type: SET_CART_PROMO_CODE_IS_LOADING, payload: status };
}

export function setOrderSubmitIsLoading(status) {
    return { type: SET_ORDER_SUBMIT_IS_LOADING, payload: status };
}

export function setAdditionalNote(additionalNote) {
    return { type: SET_ADDITIONAL_NOTE, payload: additionalNote };
}

export function setAssociatedPhone(associatedPhone) {
    return { type: SET_ASSOCIATED_PHONE, payload: associatedPhone };
}

export function setOrderInProgress(orderIsInProgress) {
    return { type: SET_ORDER_IN_PROGRESS, payload: orderIsInProgress, };
}

export function setIsPayed(isPayed) {
    return { type: SET_IS_PAYED, payload: isPayed, };
}

export function setType(type) {
    return { type: SET_TYPE, payload: type, };
}

export function setSource(source) {
    return { type: SET_SOURCE, payload: source, };
}

export function setOrderTimestamp(timestamp) {
    return { type: SET_ORDER_TIMESTAMP, payload: timestamp, };
}

export function emptyCart() {
    return { type: EMPTY_CART };
}

export function getPromoCode(code) {
    return function(dispatch) {
        dispatch(setCartPromoCode(null));
        if (code.trim() === '') {
            return;
        }
        dispatch(setCartPromoCodeIsLoading(true));

        const url = BASE_SHOP_API_URL + '/promo-code/' + code;
        axios.get(url)
            .then(response => {
                dispatch(setCartPromoCode(response.data.data));
                dispatch(setCartPromoCodeIsLoading(false));
            })
            .catch(error => {
                dispatch(setCartPromoCode(null));
                dispatch(setCartPromoCodeIsLoading(false));
            })
    }
}

export function submitOrder(cartReducerData) {
    return function(dispatch) {
        dispatch(setOrderSubmitIsLoading(true));
        const history = cartReducerData.history;
        const url = BASE_SHOP_API_URL + '/order';
        const data = cartReducerDataToOrderSubmitData(cartReducerData);

        axios.post(url, data)
            .then(response => {
                dispatch(setOrderInProgress(true)); // TODO: why order in progress true
                dispatch(emptyCart());
                dispatch(setOrderSubmitIsLoading(false));
                dispatch(showSnackbar({ message: 'cart:order:submit:success' }));
            })
            .catch(error => {
                dispatch(setOrderSubmitIsLoading(false));
                dispatch(showSnackbar({ message: 'cart:order:submit:error', severity: 'error' })); // TODO: make more specific

                if (error.response.status === 403) {
                    dispatch(attemptShopUserLogout());
                    history.push('/login');
                    dispatch(showSnackbar({ message: 'client:need_login', severity: 'error' }));
                }

                if (error.response.status === 422) {
//                    const errors = error.response.data.errors;
                }

            })
    }
}
