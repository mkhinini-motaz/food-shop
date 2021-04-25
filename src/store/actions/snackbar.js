import { HIDE_SNACKBAR, SHOW_SNACKBAR } from './types';

export function showSnackbar({  message, title = '', severity = 'success' }) {
    return { type: SHOW_SNACKBAR, payload: { message, title, severity } };
}

export function hideSnackbar() {
    return { type: HIDE_SNACKBAR };
}


