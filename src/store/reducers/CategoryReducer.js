import { APPEND_CATEGORIES, SET_CATEGORIES, SET_CATEGORIES_ARE_LOADING } from '../actions';

export const initialCategoryReducerState = {
    categories: { data: [] },
    categoriesAreLoading: false,
};

export default (state = initialCategoryReducerState, action) => {
    if (action.type === APPEND_CATEGORIES) {
        let stateCategoriesData = state.categroies.data;
        stateCategoriesData.push(...action.payload.data);
        action.payload.data = stateCategoriesData;
        return { ...state, categroies: action.payload };
    }

    if (action.type === SET_CATEGORIES) {
        return { ...state, categories: action.payload };
    }

    if (action.type === SET_CATEGORIES_ARE_LOADING) {
        return { ...state, categoriesAreLoading: action.payload };
    }

    return state;
};
