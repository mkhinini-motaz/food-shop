import axios from 'axios';

import { initialCategoryReducerState } from '../reducers/CategoryReducer';
import { APPEND_CATEGORIES, SET_CATEGORIES, SET_CATEGORIES_ARE_LOADING } from './types';
import { BASE_CLIENT_API_URL, FETCH_TYPE_APPEND, FETCH_TYPE_OVERRIDE } from '../../constants'

export function appendCategories(categories) {
    return { type: APPEND_CATEGORIES, payload: categories };
}

export function setCategories(categories) {
    return { type: SET_CATEGORIES, payload: categories };
}

export function setCategoriesAreLoading(status) {
    return { type: SET_CATEGORIES_ARE_LOADING, payload: status };
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

export function fetchCategories({ shopId, page = 1, perPage = 20, orderBy = 'created_at', orderDirection = 'desc', fetchType = FETCH_TYPE_OVERRIDE })  {
    return function(dispatch) {
        dispatch(setCategoriesAreLoading(true));
        if (fetchType === FETCH_TYPE_OVERRIDE) {
            dispatch(setCategories(initialCategoryReducerState.categories));
        }

        const params = { page, perPage, orderBy, orderDirection };

        axios.get(BASE_CLIENT_API_URL + '/shop/1/category', { params }) // TODO: dynamic shops
            .then(response => {
                dispatch(fetchCategoriesAction(response.data, fetchType));
                dispatch(setCategoriesAreLoading(false));
            })
            .catch(error => {
                dispatch(setCategoriesAreLoading(false));
            })
    }
}
