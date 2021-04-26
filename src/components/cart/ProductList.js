import React from 'react';
import { Button, List } from '@material-ui/core';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

import { BASE_BACKEND_URL, COMPONENT_SHOW_DELAY, PRODUCT } from '../../constants';
import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import PromoCode from "./PromoCode";
import Total from "./Total";
import AdditionalNote from "./AdditionalNote";

function productInfoForOrderDisplay(product) {
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
            minifiedDisplay={props.showProductPhotos !== false}
            product={productInfoForOrderDisplay(product)}
            hideDivider={parseInt(index) === lastProductInCartIndex}
        />);

        totalPrice += product.price * product.product_count;
        showDelay += COMPONENT_SHOW_DELAY;
    }


    const transporterIconOnClick = () => console.log('transporter');
    const headerActions = [
        (<Button onClick={transporterIconOnClick} key={'delivery_icon_' + props.order.id}>
            <DirectionsBikeIcon />
        </Button>),
    ];
    return (
        <div>
            <div className="p2">
                {headerActions}
            </div>
            <List className="bg-white" >
                {productCartItemComponents}
            </List>
            <AdditionalNote additionalNote={props.order.additional_note} withMargins={props.showPromoCode !== false} showDelay={showDelay + COMPONENT_SHOW_DELAY * 2} />
            {props.showPromoCode === false ? '' : <PromoCode promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 3} />}
            {props.showTotal === false ? '' : <Total value={totalPrice} promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 4} />}
        </div>
    );
}
