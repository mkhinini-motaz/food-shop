import React from 'react';

import { COMPONENT_SHOW_DELAY } from '../../constants';
import PromoCode from "./PromoCode";
import Total from "./Total";
import SubmitOrder from "./SubmitOrder";
import AdditionalNote from "./AdditionalNote";
import ProductListForCart from "./ProductListForCart";

export default function CartContents(props) {
    let showDelay = COMPONENT_SHOW_DELAY * (props.products?.length || 1);
    let showDelayMultiplier = 1;

// TODO: show how many points will be won by current order
    return (
        <div style={{ position: 'relative' }}>
            <ProductListForCart products={props.products} productsInfo={props.productsInfo} />
            <PromoCode showDelay={showDelay + COMPONENT_SHOW_DELAY * showDelayMultiplier++} />
            <Total products={props.products} productsInfo={props.productsInfo} showDelay={showDelay + COMPONENT_SHOW_DELAY * showDelayMultiplier++} />
            <SubmitOrder showDelay={showDelay + COMPONENT_SHOW_DELAY * showDelayMultiplier++} />
        </div>
    );
}
