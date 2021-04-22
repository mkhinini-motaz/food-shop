import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import QuantityActionButton from '../common/QuantityActionButton';
import Translate from "../common/Translate";
import {deleteCartProductTypeWithOptions, setCartProductTypeFixed, showConfirmDialog} from '../../store/actions';
import { PRODUCT } from "../../constants";
import TranslateField from "../common/TranslateField";
import { translate, translateField } from "../../i18n";

export default function Product(props) {
    const dispatch = useDispatch();
    const { product, hideDivider } = props;
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    const quantityActionButtonFlexRowClassName = selectedLangWriteFrom === 'right' ? 'd-flex flex-row-reverse justify-content-end' : '';
    const deleteIconTextAlign = selectedLangWriteFrom === 'right' ? 'text-left' : 'text-right';
    const productKey = 'product-cart-item-' + product.id + '-quantity-action-button' +
        (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '');

    const quantityActionButtonOnClick = newValue => {
        if (product.type !== PRODUCT.TYPE_FIXED) {
            return;
        }

        if (newValue === 0) {
            return dispatch(showConfirmDialog({
                title: <Translate value="product:delete:confirm:title"/>,
                content: <Translate value="product:delete:confirm:content"/>,
                onConfirm: () => {
                    return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }));
                },
            }));
        }
        return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }))
    };

    const deleteIconOnClick = () => {
        return dispatch(showConfirmDialog({
            title: <Translate value="product:delete:confirm:title"/>,
            content: <Translate value="product:delete:confirm:content"/>,
            onConfirm: () => {
                return dispatch(deleteCartProductTypeWithOptions(product.id_in_cart));
            },
        }));
    }

    const productButtons = product.type === PRODUCT.TYPE_FIXED ?
        <QuantityActionButton
            key={productKey}
            classes={{ root: quantityActionButtonFlexRowClassName }}
            count={product.product_count}
            hideCount
            textAlign={selectedLangWriteFrom === 'left' ? 'right' : 'left'}
            onClick={quantityActionButtonOnClick}
        /> :
        <DeleteIcon
            color="secondary"
            fontSize="large"
            onClick={deleteIconOnClick}/>;

    return (
        <Collapse in={isShown}>
            <ListItem className={flexRowClassName + ' ' + props.className}>
                <ListItemAvatar>
                    {!product.photo ? <span></span> : <Avatar alt="product" src={product.photo} />}
                </ListItemAvatar>
                <ListItemText
                primary={<TranslateField value={product} field="name" />}
                className={'d-inline text-' + selectedLangWriteFrom + ' ' + flexRowClassName}
                secondary={
                    <span>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={'d-flex ' + flexRowClassName}
                        >
                            <span>{product.ingredients.map(element => {
                                if (element.quantity) {
                                    return translateField(element, 'name', selectedLang, true) +
                                        ' (' + translate('ingredient:quantity:' + element.quantity, selectedLang, true) +
                                        ')'
                                }
                                return translateField(element, 'name', selectedLang, true);
                            }).join(', ')}</span>
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={'d-flex ' + flexRowClassName}
                        >
                            {! product.product_count ? '' : <span>{product.product_count}</span>}
                            {! product.product_count ? '' : <span className="mx-1">-</span>}
                            <span>{product.total}</span>
                        </Typography>
                    </span>
                }
                />

                {/* display trash for product with options instead of quantity button */}
                {! product.photo ? '' :
                    <ListItemText
                        className={deleteIconTextAlign}
                        style={{ minWidth: '22%' }}
                        primary={productButtons}
                    />
                }
            </ListItem>
            {hideDivider ? '' : <Divider variant="inset" component="li" />}
      </Collapse>
    );
}
// TODO: add confirmation to quantityActionButton on click callback
