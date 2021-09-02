import { SHOW_TRANSPORTER_DIALOG, HIDE_TRANSPORTER_DIALOG } from '../actions';

export const initialTransporterDialogReducerState = {
    order: {},
    isVisible: false,
};

export default (state = initialTransporterDialogReducerState, action) => {
    if (action.type === SHOW_TRANSPORTER_DIALOG) {
        return { ...initialTransporterDialogReducerState, isVisible: true, order: action.payload };
    }

    if (action.type === HIDE_TRANSPORTER_DIALOG) {
        return { ...initialTransporterDialogReducerState };
    }

    return state;
};
