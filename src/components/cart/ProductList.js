import React from 'react';
import { useSelector } from "react-redux";
import { List } from '@material-ui/core';

import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import Total from "../order/Total";
import TranslateField from "../common/TranslateField";
import { BASE_BACKEND_URL, COMPONENT_SHOW_DELAY, ORDER, PRODUCT } from '../../constants';
import { productPrice, productPriceForDialog } from "../../utils";

export default function ProductList(props) {
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : ' ';
    const textAlign = selectedLangWriteFrom === 'right' ? ' text-right ' : ' text-left ';

    let productCartItemComponents = [];
    let showDelay = 0;
    let totalPrice = 0;
    const products = props.products;
    const lastProductInCartIndex = products.length - 1;
    let product;
    for (let index in products) {
        product = products[index];
        productCartItemComponents.push(<Product
            key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '')}
            showDelay={showDelay}
            minifiedDisplay={props.showProductPhotos !== false}
            product={productInfoForOrderDisplay(product)}
            hideDivider={parseInt(index) === lastProductInCartIndex}
        />);
        totalPrice += productPriceForDialog(product);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div>
            <List className="bg-white border_radius_15" >
                {productCartItemComponents}
            </List>
            {props.showTotal === false ? '' : <Total value={totalPrice} deliveryFee={props.deliveryFee} />}
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
        category: product.category,
        type: product.type,
        product_count: product.product_count,
        options: product.options || [],
        options_str: product.options_str.replace(/XX (.*?)(, |\n)/g, '<span class="crossed">$1</span>$2'),
        photo: BASE_BACKEND_URL + product.photo,
        price: <MoneyFormatter value={product.price} />,
        total: <MoneyFormatter value={productPriceForDialog(product)} />,
    };
}
