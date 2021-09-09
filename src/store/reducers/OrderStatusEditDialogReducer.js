import { SHOW_ORDER_STATUS_EDIT_DIALOG, HIDE_ORDER_STATUS_EDIT_DIALOG } from '../actions';

export const initialOrderStatusEditDialogReducerState = {
    order: {},
    isVisible: false,
};

export default (state = initialOrderStatusEditDialogReducerState, action) => {
    if (action.type === SHOW_ORDER_STATUS_EDIT_DIALOG) {
        return { isVisible: true, order: action.payload };
    }

    if (action.type === HIDE_ORDER_STATUS_EDIT_DIALOG) {
        return { ...initialOrderStatusEditDialogReducerState };
    }

    return state;
};
