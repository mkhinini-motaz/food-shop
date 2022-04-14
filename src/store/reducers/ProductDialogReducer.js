import { SHOW_PRODUCT_CREATE_DIALOG, HIDE_PRODUCT_CREATE_DIALOG, SHOW_PRODUCT_DELETE_DIALOG, HIDE_PRODUCT_DELETE_DIALOG } from '../actions';

export const initialProductDialogReducerState = {
    create: {
        product: {},
        isVisible: false,
        onConfirm: () => {},
        onCancel: () => {},
    },
    delete: {
        product: {},
        isVisible: false,
        onConfirm: () => {},
        onCancel: () => {},
    }
};

export default (state = initialProductDialogReducerState, action) => {
    if (action.type === SHOW_PRODUCT_CREATE_DIALOG) {
        const { product, onConfirm, onCancel = () => {} } = action.payload;
        return { create: { isVisible: true, product, onConfirm, onCancel }, delete: state.delete };
    }

    if (action.type === HIDE_PRODUCT_CREATE_DIALOG) {
        return { create: initialProductDialogReducerState.create, delete: state.delete };
    }

    if (action.type === SHOW_PRODUCT_DELETE_DIALOG) {
        const { product, onConfirm, onCancel = () => {} } = action.payload;
        return { create: state.create, delete: { isVisible: true, product, onConfirm, onCancel } };
    }

    if (action.type === HIDE_PRODUCT_DELETE_DIALOG) {
        return { create: state.create, delete: initialProductDialogReducerState.delete };
    }

    return state;
};
