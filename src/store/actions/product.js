import axios from 'axios';

import { initialProductReducerState } from '../reducers/ProductReducer';
import { APPEND_PRODUCTS, SET_PRODUCT_IS_VISIBLE_IS_LOADING, SET_PRODUCTS, SET_PRODUCTS_ARE_LOADING, UPDATE_PRODUCT_IN_LIST } from './types';
import { BASE_SHOP_API_URL, FETCH_TYPE_APPEND, FETCH_TYPE_OVERRIDE } from '../../constants'
import { showSnackbar } from "./snackbar";
import { setIsLoading } from "./loader";

export function appendProducts(products) {
    return { type: APPEND_PRODUCTS, payload: products };
}

export function setProducts(products) {
    return { type: SET_PRODUCTS, payload: products };
}

export function setProductsAreLoading(status) {
    return { type: SET_PRODUCTS_ARE_LOADING, payload: status };
}

export function setProductIsVisibleIsLoading(categoryId, isVisible) {
    return { type: SET_PRODUCT_IS_VISIBLE_IS_LOADING, payload: { categoryId, isVisible } };
}
export function setProductIsVisible(product) {
    return { type: UPDATE_PRODUCT_IN_LIST, payload: product };
}

function fetchProductsAction(payload, fetchType) {
    switch (fetchType) {
        case FETCH_TYPE_APPEND:
            return appendProducts(payload);
        case FETCH_TYPE_OVERRIDE:
            return setProducts(payload);
        default:
            throw new Error('Unknow argument value fetchType')
    }
}

export function fetchProducts({ categoryId = null, productIds = null, page = 1, perPage = 20, orderBy = 'created_at', orderDirection = 'desc', fetchType = FETCH_TYPE_OVERRIDE }) {
    if (Array.isArray(productIds) && productIds.length === 0) {
        return setProducts(initialProductReducerState.products);
    }

    return function(dispatch) {
        dispatch(setIsLoading(true));
        if (fetchType === FETCH_TYPE_OVERRIDE) {
            dispatch(setProducts(initialProductReducerState.products));
        }
        const url = BASE_SHOP_API_URL +
            (categoryId ? '/category/' + categoryId : '') +
            '/product';
        const params = { page, perPage, orderBy, orderDirection, product_ids: productIds };
        axios.get(url, { params })
            .then(response => {
                dispatch(fetchProductsAction(response.data, fetchType));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
            })
    }
}

export function trySettingProductIsVisible({ productId, isVisible })  {
    return function(dispatch) {
        dispatch(setProductIsVisibleIsLoading(productId, true));
        const params = { isVisible };

        axios.post(BASE_SHOP_API_URL + '/product/' + productId + (isVisible ? '/show' : '/hide'), { params })
            .then(response => {
                dispatch(showSnackbar({ title: 'product:edit:title', message: 'product:is_visible:success:message:' + !! isVisible }));
                dispatch(setProductIsVisible(response.data.data));
            })
            .catch(error => {
                dispatch(setProductIsVisibleIsLoading(productId, false));
            })
    }
}
