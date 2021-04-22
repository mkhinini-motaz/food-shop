import { SHOW_CONFIRM_DIALOG, HIDE_CONFIRM_DIALOG } from '../actions';

export const initialConfirmDialogReducerState = {
    isVisible: false,
    title: '',
    content: '',
    onConfirm: () => {},
    onCancel: () => {},
};

export default (state = initialConfirmDialogReducerState, action) => {
    if (action.type === SHOW_CONFIRM_DIALOG) {
        const { title, content, onConfirm, onCancel = () => {} } = action.payload;
        return { isVisible: true, title, content, onConfirm, onCancel };
    }

    if (action.type === HIDE_CONFIRM_DIALOG) {
        return initialConfirmDialogReducerState;
    }

    return state;
};
