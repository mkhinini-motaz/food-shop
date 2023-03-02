import { SHOW_PRODUCT_PRICE_UPDATE_DIALOG, HIDE_PRODUCT_PRICE_UPDATE_DIALOG } from '.';

export function hideProductPriceUpdateDialog() {
    return { type: HIDE_PRODUCT_PRICE_UPDATE_DIALOG };
}

export function showProductPriceUpdateDialog(product)  {
    return { type: SHOW_PRODUCT_PRICE_UPDATE_DIALOG, payload: product };
}

