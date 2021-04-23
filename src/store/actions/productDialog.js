import { SHOW_ORDER_DIALOG, HIDE_ORDER_DIALOG } from '.';

export function hideOrderDialog() {
    return { type: HIDE_ORDER_DIALOG };
}

export function showOrderDialog(order)  {
    return { type: SHOW_ORDER_DIALOG, payload: { order, onConfirm: () => {}, onCancel: () => {} } };
}
