import { SHOW_ORDER_STATUS_EDIT_DIALOG, HIDE_ORDER_STATUS_EDIT_DIALOG, SET_ORDER_STATUS_UPDATE_IS_LOADING, } from '../actions';

export const initialOrderStatusEditDialogReducerState = {
    order: {},
    isVisible: false,
    orderStatusUpdateIsLoading: false,
};

export default (state = initialOrderStatusEditDialogReducerState, action) => {
    if (action.type === SHOW_ORDER_STATUS_EDIT_DIALOG) {
        return { isVisible: true, order: action.payload };
    }

    if (action.type === HIDE_ORDER_STATUS_EDIT_DIALOG) {
        return { ...initialOrderStatusEditDialogReducerState };
    }

    if (action.type === SET_ORDER_STATUS_UPDATE_IS_LOADING) {
        return { ...state, orderStatusUpdateIsLoading: action.payload };
    }

    return state;
};
