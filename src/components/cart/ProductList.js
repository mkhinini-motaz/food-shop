import React from 'react';
import { List } from '@material-ui/core';

import {BASE_BACKEND_URL, BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY, PRODUCT} from '../../constants';
import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import PromoCode from "./PromoCode";
import Total from "./Total";
import AdditionalNote from "./AdditionalNote";

function productInfoForCartItem(product) {
console.log('111 : ', product)
    return {
        id: product.id,
        name: product.name,
        type: product.type,
        product_count: product.product_count,
        ingredient_categories: product.ingredient_categories || [],
        photo: BASE_BACKEND_URL + product.photo,
        price: <MoneyFormatter value={product.price} />,
        total: <MoneyFormatter value={product.price * product.product_count} />,
    };
}

export default function ProductList(props) {
    let productCartItemComponents = [];
    let showDelay = 0;
    let totalPrice = 0;
    const products = props.order.products || [];
    const lastProductInCartIndex = products.length - 1;
    let product;
    for (let index in products) {
        product = products[index];
        productCartItemComponents.push(<Product
            key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '')}
            showDelay={showDelay}
            product={productInfoForCartItem(product)}
            hideDivider={index === lastProductInCartIndex}
        />);

        totalPrice += product.price * product.product_count;
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div>
            <List className="bg-white mb-2" style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                {productCartItemComponents}
            </List>
            <PromoCode promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 2} />
            <Total value={totalPrice} promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 3} />
            <AdditionalNote additionalNote={props.order.additional_note} showDelay={showDelay + COMPONENT_SHOW_DELAY * 4} />
        </div>
    );
}
