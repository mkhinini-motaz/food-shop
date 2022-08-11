import React from 'react';
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY, PRODUCT } from "../../constants";
import { List } from "@material-ui/core";
import ProductForCart from "./ProductForCart";

export default function ProductListForCart(props) {
    let product;
    let productKey;
    let showDelay                 = 0;
    let productCartItemComponents = [];
    const lastProductInCartIndex  = props.productsInfo.length - 1;

    for (let [index, productCartInfo] of props.productsInfo.entries()) {
        product = props.products.filter(product => product.id === productCartInfo.product_id).shift();
        if (! product) {
            continue;
        }

        productKey = 'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + productCartInfo.id_in_cart : '');
        productCartItemComponents.push(<ProductForCart key={productKey} showDelay={showDelay}
                                                product={product}
                                                productCartInfo={productCartInfo}
                                                hideDivider={index === lastProductInCartIndex}
        />);

        showDelay += COMPONENT_SHOW_DELAY;
    }

    if (productCartItemComponents.length === 0) {
        return <></>;
    }

    return (
        <List className="bg-white mb-2 border_radius_15" style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
            {productCartItemComponents}
        </List>
    );
}
