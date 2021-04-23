import { SHOW_ORDER_DIALOG, HIDE_ORDER_DIALOG } from '../actions';

export const initialOrderDialogReducerState = {
    order: {},
    isVisible: false,
    onConfirm: () => {},
    onCancel: () => {},
};

export default (state = initialOrderDialogReducerState, action) => {
    if (action.type === SHOW_ORDER_DIALOG) {
        const { order, onConfirm, onCancel = () => {} } = action.payload;
        return { isVisible: true, order, onConfirm, onCancel };
    }

    if (action.type === HIDE_ORDER_DIALOG) {
        return { ...initialOrderDialogReducerState, order: state.order };
    }

    return state;
};
