import React from 'react';

import { COMPONENT_SHOW_DELAY } from '../../constants';
import PromoCode from "./PromoCode";
import Total from "./Total";
import SubmitOrder from "./SubmitOrder";
import AdditionalNote from "./AdditionalNote";
import ProductListForCart from "./ProductListForCart";
import IsPayed from "./IsPayed";

export default function ClientInfo(props) {
    let showDelay = COMPONENT_SHOW_DELAY * (props.products?.length || 1);

// TODO: associated phone number
    return (
        <div style={{ position: 'relative' }}>
            <IsPayed />
        </div>
    );
}
