import { APPEND_PRODUCTS, SET_PRODUCTS, SET_PRODUCTS_ARE_LOADING } from '../actions';

export const initialProductReducerState = {
    products: { data: [] },
    productsAreLoading: false,
};

export default (state = initialProductReducerState, action) => {
    if (action.type === APPEND_PRODUCTS) {
        let stateProductsData = state.products.data;
        stateProductsData.push(...action.payload.data);
        action.payload.data = stateProductsData;
        return { ...state, products: action.payload };
    }

    if (action.type === SET_PRODUCTS) {
        return { ...state, products: action.payload };
    }

    if (action.type === SET_PRODUCTS_ARE_LOADING) {
        return { ...state, productsAreLoading: action.payload };
    }

    return state;
};
