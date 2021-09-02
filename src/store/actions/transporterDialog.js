import { SHOW_TRANSPORTER_DIALOG, HIDE_TRANSPORTER_DIALOG } from '../actions';

export function hideTransporterDialog() {
    return { type: HIDE_TRANSPORTER_DIALOG };
}

export function showTransporterDialog(order)  {
    return { type: SHOW_TRANSPORTER_DIALOG, payload: order };
}
