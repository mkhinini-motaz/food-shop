import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@material-ui/core';

import Translate from '../common/Translate';

export default function ProductDeleteDialog(props) {
    const { product, isVisible, onConfirm, onCancel } = props;
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const productInCart = useSelector(state => {
        return state.CartReducer.products.find(productInfo => productInfo.product_id === product.id)
    }) || { count: 0 };

    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    return (
        <Dialog
            open={isVisible}
            onClose={onCancel}
        >
            <DialogTitle className={textAlign}>
                <Typography variant="h4" component="span" color="primary">
                    <Translate value="product:delete"/>
                </Typography>
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word'}>
                Delete
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={onCancel} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={() => {
//                    dispatch(setCartProduct({ product_id: product.id, product_count: 1, ingredients: ingredientChoices }));
                    onConfirm();
                }} color="primary">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
