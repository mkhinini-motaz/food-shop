import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, } from '@material-ui/core';

import Translate from '../common/Translate';
import Loader from "../common/Loader";
import ProductListForCart from "../cart/ProductListForCart";
import { fetchProducts, hideProductDeleteDialog } from "../../store/actions";
import { SHOP_ID } from "../../constants";

export default function ProductDeleteDialog(props) {
    const { product, isVisible, } = props;
    const dispatch = useDispatch();

    const products              = useSelector(state => state.ProductReducer.products.data);
    const productsAreLoading    = useSelector(state => state.ProductReducer.productsAreLoading);
    const productsInfoOriginal  = useSelector(state => state.CartReducer.products);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const productsInfo = productsInfoOriginal.filter(productInfo => productInfo.product_id === product.id);
    useEffect(() => {
        dispatch(fetchProducts({
            productIds: productsInfo.map(productInfo => productInfo.product_id),
            perPage: productsInfo.length
        }));
    }, [product.id]);

    if (productsInfo.length === 0) {
        dispatch(hideProductDeleteDialog());
    }

    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    return (
        <Dialog
            open={isVisible}
            onClose={() => dispatch(hideProductDeleteDialog())}
        >
            <DialogTitle className={textAlign}>
                <Typography variant="h4" component="span" color="primary">
                    <Translate value="product:delete:type_with_options"/>
                </Typography>
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word'}>
                { productsAreLoading ?
                    <div className={'text-center my-3 mx-auto w-md-75 w-sm-100'}>
                        <Loader />
                    </div> :
                    <ProductListForCart products={products} productsInfo={productsInfo} />
                }
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideProductDeleteDialog())} color="primary">
                    <Translate value="common:close" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
