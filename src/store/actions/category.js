import axios from 'axios';

import { initialCategoryReducerState } from '../reducers/CategoryReducer';
import {
    APPEND_CATEGORIES,
    SET_CATEGORIES,
    SET_CATEGORIES_ARE_LOADING, UPDATE_CATEGORY_IN_LIST,
    SET_CATEGORY_IS_VISIBLE_IS_LOADING
} from './types';
import { BASE_SHOP_API_URL, FETCH_TYPE_APPEND, FETCH_TYPE_OVERRIDE } from '../../constants'
import {showSnackbar} from "./snackbar";
import { setIsLoading } from "./loader";

export function appendCategories(categories) {
    return { type: APPEND_CATEGORIES, payload: categories };
}

export function setCategories(categories) {
    return { type: SET_CATEGORIES, payload: categories };
}

export function setCategoriesAreLoading(status) {
    return { type: SET_CATEGORIES_ARE_LOADING, payload: status };
}

export function setCategoryIsVisibleIsLoading(categoryId, isVisible) {
    return { type: SET_CATEGORY_IS_VISIBLE_IS_LOADING, payload: { categoryId, isVisible } };
}
export function setCategoryIsVisible(category) {
    return { type: UPDATE_CATEGORY_IN_LIST, payload: category };
}

function fetchCategoriesAction(payload, fetchType) {
    switch (fetchType) {
        case FETCH_TYPE_APPEND:
            return appendCategories(payload);
        case FETCH_TYPE_OVERRIDE:
            return setCategories(payload);
        default:
            throw new Error('Unknow argument value fetchType')
    }
}

export function fetchCategories({ page = 1, perPage = 20, orderBy = 'created_at', orderDirection = 'desc', fetchType = FETCH_TYPE_OVERRIDE })  {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        if (fetchType === FETCH_TYPE_OVERRIDE) {
            dispatch(setCategories(initialCategoryReducerState.categories));
        }

        const params = { page, perPage, orderBy, orderDirection };

        axios.get(BASE_SHOP_API_URL + '/category', { params })
            .then(response => {
                dispatch(fetchCategoriesAction(response.data, fetchType));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
            })
    }
}

export function trySettingCategoryIsVisible({ categoryId, isVisible })  {
    return function(dispatch) {
        dispatch(setCategoryIsVisibleIsLoading(categoryId, true));
        const params = { isVisible };

        axios.post(BASE_SHOP_API_URL + '/category/' + categoryId + (isVisible ? '/show' : '/hide'), { params })
            .then(response => {
                dispatch(showSnackbar({ title: 'category:edit:title', message: 'category:is_visible:success:message:' + !! isVisible }));
                dispatch(setCategoryIsVisible(response.data.data));
            })
            .catch(error => {
                dispatch(setCategoryIsVisibleIsLoading(categoryId, false));
            })
    }
}
