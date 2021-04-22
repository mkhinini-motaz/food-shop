import axios from "axios";

import { BASE_CLIENT_API_URL } from "../../constants";
import { SET_CART_PRODUCT_TYPE_FIXED, CREATE_CART_PRODUCT_WITH_INGREDIENTS, SET_CART_PRODUCTS, SET_CART_ADDRESS, SET_CART_PROMO_CODE, SET_CART_PROMO_CODE_IS_LOADING, DELETE_CART_PRODUCT_WITH_INGREDIENTS, SET_ADDITIONAL_NOTE, } from './types';

export function setCartProductTypeFixed({ product_id, product_count }) {
    return { type: SET_CART_PRODUCT_TYPE_FIXED, payload: { product_id, product_count } };
}

export function setCartProductTypeWithOptions({ product_id, product_count, ingredients }) {
    return { type: CREATE_CART_PRODUCT_WITH_INGREDIENTS, payload: { product_id, product_count, ingredients } };
}

export function deleteCartProductTypeWithOptions(product_id_in_cart) {
    return { type: DELETE_CART_PRODUCT_WITH_INGREDIENTS, payload: product_id_in_cart };
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

export function setAdditionalNote(additionalNote) {
    return { type: SET_ADDITIONAL_NOTE, payload: additionalNote };
}

export function getPromoCode(code) {
    return function(dispatch) {
        dispatch(setCartPromoCode(null));
        if (code.trim() === '') {
            return;
        }
        dispatch(setCartPromoCodeIsLoading(true));

        const url = BASE_CLIENT_API_URL + '/promo-code/' + code;
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
