import { SET_IS_LOADING, } from '../actions';

export const initialLoaderReducerState = {
    isLoading: false,
};

export default (state = initialLoaderReducerState, action) => {
    if (action.type === SET_IS_LOADING) {
        return { isLoading: action.payload, };
    }

    return state;
};
