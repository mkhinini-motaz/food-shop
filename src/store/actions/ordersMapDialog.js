import { SHOW_ORDERS_MAP_DIALOG, HIDE_ORDERS_MAP_DIALOG } from '.';

export function hideOrdersMapDialog() {
    return { type: HIDE_ORDERS_MAP_DIALOG };
}

export function showOrdersMapDialog(order)  {
    return { type: SHOW_ORDERS_MAP_DIALOG, payload: order };
}
