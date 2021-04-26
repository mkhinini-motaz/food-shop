import {
    APPEND_PRODUCTS,
    SET_PRODUCT_IS_VISIBLE_IS_LOADING,
    SET_PRODUCTS,
    SET_PRODUCTS_ARE_LOADING,
    UPDATE_PRODUCT_IN_LIST
} from '../actions';

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

    if (action.type === SET_PRODUCT_IS_VISIBLE_IS_LOADING) {
        return { ...state, categoryIsVisibleLoading: { [action.payload.categoryId]: action.payload.isLoading } };
    }

    if (action.type === UPDATE_PRODUCT_IN_LIST) {
        const products = [];
        for (let product of state.products.data) {
            if (product.id === action.payload.id) {
                products.push(action.payload);
                continue;
            }
            products.push(product)
        }
        return { ...state, products: { ...state.products, data: products } };
    }
    return state;
};
