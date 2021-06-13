import React from 'react';
import { useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';

import Translate from "../common/Translate";

export default function PromoCode(props) {
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    setTimeout(() => { setIsShown(previousIsShown => true); }, 500 + props.showDelay);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 p-2 text-left'}
            >
                <Typography variant="body1" color="textPrimary" component="span">
                    <Translate value="cart:promo_code:label" />
                </Typography>
                <span> : </span>
                <Typography variant="body1" color="textSecondary" component="span">
                    {props.promoCode && props.promoCode.code}
                </Typography>
            </div>
        </Collapse>
    );
}
