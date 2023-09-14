import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';

import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";
import { productPrice } from "../../utils";

export default function Total(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const [ isShown, setIsShown ] = React.useState(false);
    const { order } = props;

    const total = order.total_price + (! order.promo_code ? 0 : order.promo_code.reduction_amount);
    const totalToPay = order.total_price + (order.delivery_fee ?? 0)

    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'left' ? '-reverse' : '');

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' bg-white my-2 p-3 border_radius_15'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                {! order.delivery_fee && ! order.promo_code ? '' : <>
                    <Typography component="span" variant="body1" color="textPrimary" className={'d-flex align-items-center justify-content-between ' + flexRowClassName} >
                        <MoneyFormatter value={total} />
                        <span className="mx-2"></span>
                        <Translate value="form:total:label" />
                    </Typography>

                    {! order.delivery_fee ? '' :
                        <Typography component="span" variant="body1" color="textPrimary" className={'d-flex align-items-center justify-content-between ' + flexRowClassName} >
                            <MoneyFormatter value={order.delivery_fee} />
                            <span className="mx-2"></span>
                            <Translate value="cart:delivery:label" />
                        </Typography>
                    }

                    {! order.promo_code ? '' :
                        <Typography component="span" variant="body1" style={{ color: COLOR_PRIMARY }} className={'d-flex align-items-center justify-content-between ' + flexRowClassName} >
                            <span className={"d-flex flex-nowrap " + flexRowClassName}>
                                <MoneyFormatter value={order.promo_code.reduction_amount} />
                                <span className="mx-1">-</span>
                            </span>
                            <span className="mx-2"></span>
                            <Translate value="cart:promo_code:label" />
                        </Typography>
                    }
                </>}

                <Typography component="span" variant="body1" color="textPrimary"
                            className={'d-flex align-items-center justify-content-between ' + flexRowClassName}
                >
                    <span className={"font-weight-bold "}>
                        <MoneyFormatter value={totalToPay} />
                    </span>
                    <span className="mx-2"></span>
                    <Translate value="form:total_to_pay:label" />
                </Typography>
            </div>
        </Collapse>
    );
}
