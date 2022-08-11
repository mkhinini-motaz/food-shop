import React from 'react';

import IsPayed from "./IsPayed";
import OrderDate from "./OrderDate";
import { COMPONENT_SHOW_DELAY } from "../../constants";
import Type from "./Type";
import Source from "./Source";
import AssociatedPhone from "./AssociatedPhone";
import AdditionalNote from "./AdditionalNote";

export default function ClientInfo(props) {

// TODO: associated phone number
    let showDelayMultiplier = 1;
    return (
        <div style={{ position: 'relative' }}>
            {/*
            <OrderDate showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++}/>
            */}
            <Source showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++}/>
            <Type showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++}/>
            <AssociatedPhone showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++}/>
            <AdditionalNote showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++} />
            <IsPayed showDelay={COMPONENT_SHOW_DELAY * showDelayMultiplier++} />
        </div>
    );
}
