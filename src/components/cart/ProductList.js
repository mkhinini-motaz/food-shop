import React from 'react';
import { useSelector } from "react-redux";
import { List } from '@material-ui/core';

import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import Total from "./Total";
import TranslateField from "../common/TranslateField";
import { BASE_BACKEND_URL, COMPONENT_SHOW_DELAY, PRODUCT } from '../../constants';
import { optionGroupsOutput, productPrice } from "../../utils";

export default function ProductList(props) {
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : ' ';
    const textAlign = selectedLangWriteFrom === 'right' ? ' text-right ' : ' text-left ';

    let productCartItemComponents = [];
    let showDelay = 0;
    let totalPrice = 0;
    const products = props.order.products || [];
    const lastProductInCartIndex = products.length - 1;
    let product;
    for (let index in products) {
        product = products[index];
        if (props.detailedView) {
            productCartItemComponents.push(<Product
                key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '')}
                showDelay={showDelay}
                minifiedDisplay={props.showProductPhotos !== false}
                product={productInfoForOrderDisplay(product)}
                hideDivider={parseInt(index) === lastProductInCartIndex}
            />);
        } else {
// TODO: move into ProductSimpleView
            productCartItemComponents.push(<div className="my-2" key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '')} >
                <div className={'mx-2 d-flex align-items-center ' + flexRowClassName}>
                    <span>{product.product_count}</span>
                    <span className="mx-2">{' x '}</span>
                    <span>
                        <TranslateField value={product.category.name} />
                        <span> - </span>
                        <TranslateField value={product.name} />
                    </span>
                </div>
                <div className={'mx-2 px-3 d-flex ' + flexRowClassName + textAlign}>
                    {optionGroupsOutput(product.option_groups, product.product_count, selectedLang)}
                </div>
            </div>);
        }
        totalPrice += productPrice(product);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div>
            <List className="bg-white" >
                {productCartItemComponents}
            </List>
            {props.showTotal === false ? '' : <Total value={totalPrice} promoCode={props.order.promo_code} />}
        </div>
    );
}

/**
 * @param product {object}
 *
 * @returns {{total: {int}, product_count: {int}, price: {int}, name: {string}, photo: {string}, id: {int}, type: {int}, option_groups: Array}}
 */
function productInfoForOrderDisplay(product) {
    return {
        id: product.id,
        name: product.name,
        type: product.type,
        product_count: product.product_count,
        option_groups: product.option_groups || [],
        photo: BASE_BACKEND_URL + product.photo,
        price: <MoneyFormatter value={product.price} />,
        total: <MoneyFormatter value={productPrice(product)} />,
    };
}
