import { SHOW_PRODUCT_PRICE_UPDATE_DIALOG, HIDE_PRODUCT_PRICE_UPDATE_DIALOG, SET_PRODUCT_PRICE_UPDATE_IS_LOADING, } from '../actions';

export const initialProductPriceUpdateDialogReducerState = {
    product: {},
    isVisible: false,
    priceUpdateIsLoading: false,
};

export default (state = initialProductPriceUpdateDialogReducerState, action) => {
    if (action.type === SHOW_PRODUCT_PRICE_UPDATE_DIALOG) {
        return { isVisible: true, product: action.payload };
    }

    if (action.type === HIDE_PRODUCT_PRICE_UPDATE_DIALOG) {
        return { ...initialProductPriceUpdateDialogReducerState };
    }

    if (action.type === SET_PRODUCT_PRICE_UPDATE_IS_LOADING) {
        return { ...state, priceUpdateIsLoading: action.payload };
    }

    return state;
};
