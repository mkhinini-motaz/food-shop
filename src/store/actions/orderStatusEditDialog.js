import { SHOW_ORDER_STATUS_EDIT_DIALOG, HIDE_ORDER_STATUS_EDIT_DIALOG } from '.';

export function hideOrderStatusEditDialog() {
    return { type: HIDE_ORDER_STATUS_EDIT_DIALOG };
}

export function showOrderStatusEditDialog(order)  {
    return { type: SHOW_ORDER_STATUS_EDIT_DIALOG, payload: order };
}
