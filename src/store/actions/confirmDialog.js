import { SHOW_CONFIRM_DIALOG, HIDE_CONFIRM_DIALOG } from '.';

export function hideConfirmDialog() {
    return { type: HIDE_CONFIRM_DIALOG };
}

export function showConfirmDialog({ title, content, onConfirm, onCancel = false })  {
    return function(dispatch) {
        const onConfirmWithReset = () => {
            onConfirm();
            return dispatch(hideConfirmDialog());
        };

        const onCancelWithReset = () => {
            if (onCancel && typeof onCancel === 'function') {
                onCancel();
            }
            return dispatch(hideConfirmDialog());
        };

        dispatch({ type: SHOW_CONFIRM_DIALOG, payload: { title, content, onConfirm: onConfirmWithReset, onCancel: onCancelWithReset } });
    }
}
