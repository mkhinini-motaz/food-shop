import { APPEND_CATEGORIES, SET_CATEGORIES, SET_CATEGORIES_ARE_LOADING, UPDATE_CATEGORY_IN_LIST, SET_CATEGORY_IS_VISIBLE_IS_LOADING } from '../actions';

export const initialCategoryReducerState = {
    categories: { data: [] },
    categoriesAreLoading: false,
    categoryIsVisibleLoading: {},
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

    if (action.type === SET_CATEGORY_IS_VISIBLE_IS_LOADING) {
        return { ...state, categoryIsVisibleLoading: { [action.payload.categoryId]: action.payload.isLoading } };
    }

    if (action.type === UPDATE_CATEGORY_IN_LIST) {
        const categories = [];
        for (let category of state.categories.data) {
            if (category.id === action.payload.id) {
                categories.push(action.payload);
                continue;
            }
            categories.push(category)
        }
        return { ...state, categories: { ...state.categories, data: categories } };
    }

    return state;
};
