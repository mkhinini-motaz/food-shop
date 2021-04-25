import { SHOW_SNACKBAR, HIDE_SNACKBAR} from '../actions';

export const initialSnackbarReducerState = {
    isOpen: false,
    title: '',
    message: '',
    severity: 'success',
};

export default (state = initialSnackbarReducerState, action) => {
    if (action.type === SHOW_SNACKBAR) {
        return { isOpen: true, title: action.payload.title, message: action.payload.message, severity: action.payload.severity };
    }

    if (action.type === HIDE_SNACKBAR) {
        return { ...state, isOpen: false };
    }

    return state;
};
