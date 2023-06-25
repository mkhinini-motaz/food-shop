import {
    SET_CART_PRODUCT_TYPE_FIXED,
    SET_CART_PRODUCTS,
    SET_CART_ADDRESS,
    PERSIST_REHYDRATE,
    CREATE_CART_PRODUCT_WITH_OPTIONS,
    DELETE_CART_PRODUCT_WITH_OPTIONS,
    SET_CART_PROMO_CODE,
    SET_CART_PROMO_CODE_IS_LOADING,
    SET_ADDITIONAL_NOTE,
    SET_ORDER_ID,
    EMPTY_CART,
    UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS,
    SET_IS_PAYED,
    SET_ORDER_TIMESTAMP,
    SET_TYPE, SET_SOURCE, SET_ASSOCIATED_PHONE, SET_DELIVERY_FEE
} from '../actions';
import { SOURCE_ON_SITE, TYPE_TAKE_AWAY } from "../../constants";

export const initialCartReducerState = {
    orderId: null,
    products: [ ],
    address: {},
    promoCode: null,
    promoCodeIsLoading: false,
    orderSubmitIsLoading: false,
    deliveryFee: null,
    additionalNote: '',
    associatedPhone: '',
    isPayed: false,
    type: TYPE_TAKE_AWAY,
    source: SOURCE_ON_SITE,
    orderTimestamp: null,
};

export default (state = initialCartReducerState, action) => {
    if (action.type === PERSIST_REHYDRATE) {
        return action.payload?.CartReducer || state;
    }

    if (action.type === SET_CART_PRODUCTS) {
        return { ...state, products: action.payload };
    }

    if (action.type === SET_CART_PRODUCT_TYPE_FIXED) {
        let productDoesntExist = true;
        let cartProducts = state.products.map(cartProduct => {
            if (cartProduct.product_id === action.payload.product_id) {
                productDoesntExist = false;
                return { product_id: action.payload.product_id, product_count: action.payload.product_count };
            }
            return cartProduct;
        });
        cartProducts = cartProducts.filter(productInfo => productInfo.product_count > 0);

        if (productDoesntExist) {
            cartProducts.push({ product_id: action.payload.product_id, product_count: action.payload.product_count });
        }

        return { ...state, products: cartProducts };
    }

    if (action.type === CREATE_CART_PRODUCT_WITH_OPTIONS) {
        action.payload.id_in_cart = action.payload.product_id + '_' + Math.random();
        return { ...state, products: [ ...state.products, action.payload ] };
    }

    if (action.type === DELETE_CART_PRODUCT_WITH_OPTIONS) {
        const cartProducts = state.products.filter(productInfo => productInfo.id_in_cart !== action.payload);
        return { ...state, products: cartProducts };
    }

    if (action.type === UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS) {
        const cartProducts = state.products.map(productInfo => {
            if (productInfo.id_in_cart === action.payload.product_id_in_cart) {
                productInfo.product_count = action.payload.product_count;
            }

            return productInfo;
        });
        return { ...state, products: cartProducts };
    }

    if (action.type === SET_CART_ADDRESS) {
        return { ...state, address: action.payload};
    }

    if (action.type === SET_CART_PROMO_CODE) {
        return { ...state, promoCode: action.payload};
    }

    if (action.type === SET_CART_PROMO_CODE_IS_LOADING) {
        return { ...state, promoCodeIsLoading: action.payload};
    }

    if (action.type === SET_DELIVERY_FEE) {
        return { ...state, deliveryFee: action.payload};
    }

    if (action.type === SET_ADDITIONAL_NOTE) {
        return { ...state, additionalNote: action.payload};
    }

    if (action.type === SET_ASSOCIATED_PHONE) {
        return { ...state, associatedPhone: action.payload};
    }

    if (action.type === SET_ORDER_ID) {
        return { ...state, orderId: action.payload};
    }

    if (action.type === SET_IS_PAYED) {
        return { ...state, isPayed: action.payload};
    }

    if (action.type === SET_TYPE) {
        return { ...state, type: parseInt(action.payload)};
    }

    if (action.type === SET_SOURCE) {
        return { ...state, source: parseInt(action.payload)};
    }

    if (action.type === SET_ORDER_TIMESTAMP) {
        return { ...state, orderTimestamp: action.payload};
    }

    if (action.type === EMPTY_CART) {
        return { ...initialCartReducerState };
    }

    return state;
};
