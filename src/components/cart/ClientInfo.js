import React from 'react';

import IsPayed from "./IsPayed";
import OrderDate from "./OrderDate";
import { COMPONENT_SHOW_DELAY } from "../../constants";

export default function ClientInfo(props) {

// TODO: associated phone number
    return (
        <div style={{ position: 'relative' }}>
            <OrderDate showDelay={COMPONENT_SHOW_DELAY}/>
            <IsPayed showDelay={COMPONENT_SHOW_DELAY * 2} />
        </div>
    );
}
