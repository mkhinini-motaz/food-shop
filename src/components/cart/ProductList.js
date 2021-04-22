import React from 'react';
import { List } from '@material-ui/core';

import {BASE_BACKEND_URL, BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY, PRODUCT} from '../../constants';
import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import PromoCode from "./PromoCode";
import Total from "./Total";
import SubmitOrder from "./SubmitOrder";
import Map from "./Map";
import AdditionalNote from "./AdditionalNote";

function productInfoForCartItem(product, productCartInfo) {
    return {
        id: product.id,
        id_in_cart: productCartInfo.id_in_cart,
        name: product.name,
        type: product.type,
        product_count: productCartInfo.product_count,
        ingredients: productCartInfo.ingredients || [],
        photo: BASE_BACKEND_URL + product.photo,
        price: <MoneyFormatter value={product.price} />,
        total: <MoneyFormatter value={product.price * productCartInfo.product_count} />,
    };
}

export default function ProductList(props) {
    let productCartItemComponents = [];
    let showDelay = 0;
    let totalPrice = 0;
    let product;
    const lastProductInCartIndex = props.productsInfo.length - 1;
    for (let [index, productCartInfo] of props.productsInfo.entries()) {
        product = props.products.filter(product => product.id === productCartInfo.product_id).shift();
        if (!product) {
            continue;
        }

        productCartItemComponents.push(<Product
            key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + productCartInfo.id_in_cart : '')}
            showDelay={showDelay}
            product={productInfoForCartItem(product, productCartInfo)}
            hideDivider={index === lastProductInCartIndex}
        />);

        totalPrice += product.price * productCartInfo.product_count;
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div>
            <List className="bg-white mb-2" style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                {productCartItemComponents}
            </List>
            <PromoCode showDelay={showDelay + COMPONENT_SHOW_DELAY * 2} />
            <Total value={totalPrice} showDelay={showDelay + COMPONENT_SHOW_DELAY * 3} />
            <Map showDelay={showDelay + COMPONENT_SHOW_DELAY * 4} />
            <AdditionalNote showDelay={showDelay + COMPONENT_SHOW_DELAY * 5} />
            <SubmitOrder showDelay={showDelay + COMPONENT_SHOW_DELAY * 6} />

        </div>
    );
}
