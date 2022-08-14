import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';

import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";
import { productPrice } from "../../utils";

export default function Total(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const promoCode = useSelector(state => state.CartReducer.promoCode);
    const [ isShown, setIsShown ] = React.useState(false);
    const deliveryFee = 2000;// TODO: implement


    let total= props.value;

    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' bg-white my-2 p-3 border_radius_15'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <Typography component="span" variant="body1" color="textPrimary" className={'d-flex align-items-center  ' + flexRowClassName} >
                    <span className={"font-weight-bold"}><MoneyFormatter value={total} /></span>
                    <span className="mx-2"></span>
                    <Translate value="form:total:label" />
                </Typography>

                {! props.withDelivery ? '' :
                    <Typography component="span" variant="body1" color="textPrimary" className={'d-flex align-items-center  ' + flexRowClassName} >
                        <span>****</span>
                        <span className="mx-2"></span>
                        <Translate value="cart:delivery:label" />
                    </Typography>
                }
            </div>
        </Collapse>
    );
}
