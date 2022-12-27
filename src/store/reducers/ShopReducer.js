import {SET_SHOP, SET_SHOP_IS_LOADING, } from '../actions';

export const initialShopReducerState = {
    shop: { service_area: [], promo_code_shop_items: {} },
    shopIsLoading: false,
};

export default (state = initialShopReducerState, action) => {
    if (action.type === SET_SHOP) {
        return { ...state, shop: action.payload };
    }

    if (action.type === SET_SHOP_IS_LOADING) {
        return { ...state, shopIsLoading: action.payload };
    }

    return state;
};
