import React from 'react';
import { Collapse } from '@material-ui/core';

import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE } from "../../constants";

export default function DeliveryCost(props) {
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' bg-white my-2 p-3 text-left'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <MoneyFormatter value={2000} />
                <span className="mx-2"></span>
                <Translate value="cart:delivery:label" />
            </div>
        </Collapse>
    );
}
