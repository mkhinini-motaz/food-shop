import { SHOW_PRODUCT_CREATE_DIALOG, HIDE_PRODUCT_CREATE_DIALOG, SHOW_PRODUCT_DELETE_DIALOG, HIDE_PRODUCT_DELETE_DIALOG } from '.';

export function hideProductCreateDialog() {
    return { type: HIDE_PRODUCT_CREATE_DIALOG };
}

export function hideProductDeleteDialog() {
    return { type: HIDE_PRODUCT_DELETE_DIALOG };
}

export function showProductCreateDialog(product)  {
    return { type: SHOW_PRODUCT_CREATE_DIALOG, payload: { product, onConfirm: () => {}, onCancel: () => {} } };
}

export function showProductDeleteDialog(product)  {
    return { type: SHOW_PRODUCT_DELETE_DIALOG, payload: { product, onConfirm: () => {}, onCancel: () => {} } };
}
