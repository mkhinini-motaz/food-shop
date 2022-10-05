import { SHOW_ORDERS_MAP_DIALOG, HIDE_ORDERS_MAP_DIALOG } from '../actions';

export const initialOrdersMapDialogReducerState = {
    isVisible: false,
    order: {},
};

export default (state = initialOrdersMapDialogReducerState, action) => {
    if (action.type === SHOW_ORDERS_MAP_DIALOG) {
        return { isVisible: true, order: action.payload };
    }

    if (action.type === HIDE_ORDERS_MAP_DIALOG) {
        return { ...initialOrdersMapDialogReducerState };
    }

    return state;
};
