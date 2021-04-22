import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core';

import Card from '../common/Card';
import QuantityActionButton from '../common/QuantityActionButton';
import MoneyFormatter from "../common/MoneyFormatter";
import { setCartProductTypeFixed } from '../../store/actions'
import { BASE_BACKEND_URL, PRODUCT } from '../../constants'
import {showProductCreateDialog, showProductDeleteDialog} from "../../store/actions/productDialog";
import TranslateField from "../common/TranslateField";

export default function ProductCard(props) {
    const dispatch = useDispatch();
    const { product } = props;
    const productCountInCart = useSelector(state => {
        if (product.type === PRODUCT.TYPE_FIXED) {
            const fixedProduct = state.CartReducer.products
                .find(productInfo => productInfo.product_id === product.id) ||
                { product_count: 0 };
            return fixedProduct.product_count;
        }

        if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
            const products = state.CartReducer.products.filter(element => element.product_id === product.id);
            if (0 === products.length) {
                return 0;
            }

            let productCount = 0;
            for (let cartProduct of products) {
                productCount += cartProduct.product_count;
            }
            return productCount;
        }
    });

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const cardActionsClassName  = selectedLangWriteFrom === 'right' ? 'flex-row-reverse mr_12px' : '';
    const flexRowClassName      = selectedLangWriteFrom === 'right' ? 'd-flex flex-row-reverse justify-content-end' : '';

    const quantityButtonOnClick = (newValue, addedValue) => {
        if (product.type === PRODUCT.TYPE_FIXED) {
            return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }));
        }

        if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
            if (addedValue > 0) {
                return dispatch(showProductCreateDialog(product));
            }
            return dispatch(showProductDeleteDialog(product));
        }
    };

    const actions = [
        <QuantityActionButton
            key={'product-card-' + product.id + '-quantity-action-button'}
            count={productCountInCart}
            classes={{ root: flexRowClassName }}
            textAlign={selectedLangWriteFrom === 'right' ? 'left' : 'right' }
            onClick={quantityButtonOnClick}
        />
    ];
    return (
        <Card
            title={<TranslateField value={product} field="name" />}
            image={BASE_BACKEND_URL + product.photo}
            actions={actions}
            showDelay={props.showDelay}
            bottomText={<MoneyFormatter value={product.price} />}
            classes={{ cardActions : cardActionsClassName }}
            disabled
            style={{backgroundColor: "#f5952f"}}
        >
            <Typography variant="body1" color="textSecondary" component="p">
                <TranslateField value={product} field="description" />
            </Typography>
        </Card>
    );
}
