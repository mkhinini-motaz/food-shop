import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography, } from '@material-ui/core';

import MoneyFormatter from "../common/MoneyFormatter";
import QuantityActionButton from '../common/QuantityActionButton';
import Translate from "../common/Translate";
import TranslateField from "../common/TranslateField";
import { updateCountCartProductTypeWithOptions, deleteCartProductTypeWithOptions, setCartProductTypeFixed, showConfirmDialog, showSnackbar, } from '../../store/actions';
import { BASE_BACKEND_URL, COLOR_PRIMARY, PRODUCT, } from "../../constants";
import { optionOutput, productPrice, productPriceForDialog } from "../../utils";

export default function Product(props) {
    const dispatch = useDispatch();
    const product  = productInfoForCartItem(props.product, props.productCartInfo);
    const [ isShown, setIsShown ] = React.useState(false);

    const orderInProgress       = useSelector(state => state.CartReducer.orderInProgress);
    const selectedLang          = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);

    const flexRowClassName = ' flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse ' : '');
    const quantityActionButtonFlexRowClassName = selectedLangWriteFrom === 'right' ? ' d-flex flex-row-reverse justify-content-end ' : '';
    const deleteIconTextAlign = selectedLangWriteFrom === 'right' ? 'text-left' : 'text-right';
    const productKey = 'product-cart-item-' + product.id + '-quantity-action-button' +
        (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '');

    const optionsOutput = product.options
        .map(option => optionOutput(option, selectedLang, selectedLangWriteFrom))
        .join(', ');

    const quantityActionButtonOnClick = newValue => {
        if (orderInProgress) {
            dispatch(showSnackbar({ message: 'cart:order:in_progress', severity: 'error' }));
            return;
        }

        if (newValue === 0) {
            return dispatch(showConfirmDialog({
                title: <Translate value="product:delete:confirm:title"/>,
                content: <Translate value="product:delete:confirm:content"/>,
                onConfirm: () => {
                    if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
                        return dispatch(deleteCartProductTypeWithOptions(product.id_in_cart));
                    }

                    return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }));
                },
            }));
        }
        if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
            return dispatch(updateCountCartProductTypeWithOptions({ product_id_in_cart: product.id_in_cart, product_count: newValue }));
        }
        return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }))
    };

    const productButtons = <QuantityActionButton
        key={productKey}
        classes={{ root: quantityActionButtonFlexRowClassName }}
        count={product.product_count}
        hideCount
        textAlign={selectedLangWriteFrom === 'left' ? 'right' : 'left'}
        onClick={quantityActionButtonOnClick}
    />;

    return (
        <Collapse in={isShown}>
            <ListItem className={flexRowClassName + ' ' + props.className}>
                <ListItemAvatar>
                    {! product.photo ? <span></span> : <Avatar alt="product" src={product.photo} />}
                </ListItemAvatar>
                <ListItemText
                    className={'d-inline mx-1 text-' + selectedLangWriteFrom + flexRowClassName}
                    primary={
                        <span className={'d-flex align-items-center ' + flexRowClassName}>
                            <TranslateField value={product.category.name} />
                            <span className={'mx-1'}> - </span>
                            <TranslateField value={product.name} />
                            <span className="mx-1"></span>
                            <MoneyFormatter value={product.price} />
                        </span>
                    }
                    secondary={
                        <span>
                            <Typography className={'d-flex ' + flexRowClassName} component="span" variant="body2" color="textPrimary" >
                                {optionsOutput}
                            </Typography>
                            <Typography component="span" variant="body1" color="textPrimary" >
                                <span className={'mt-1 pt-1 px-2 d-inline-flex ' + flexRowClassName} style={{ backgroundColor: COLOR_PRIMARY, borderRadius: 50, }} >
                                    {! product.product_count ? '' : <span>{product.product_count}</span>}
                                    {! product.product_count ? '' : <span className="mx-1">-</span>}
                                    <span>{product.total}</span>
                                </span>
                            </Typography>
                        </span>
                    }
                />

                {! product.photo ? '' :
                    <ListItemText primary={productButtons} className={deleteIconTextAlign} style={{ minWidth: '22%' }} />
                }
            </ListItem>

            {props.hideDivider ? '' : <Divider variant="inset" component="li" />}
        </Collapse>
    );
}

// TODO: use classes instead
function productInfoForCartItem(product, productCartInfo) {
    return {
        id: product.id,
        category: product.category,
        id_in_cart: productCartInfo.id_in_cart,
        name: product.name,
        type: product.type,
        price: product.price,
        product_count: productCartInfo.product_count,
        options: productCartInfo.options || [],
        photo: BASE_BACKEND_URL + product.photo,
        total: <MoneyFormatter value={productPriceForDialog({...product, ...productCartInfo})} />,
    };
}
