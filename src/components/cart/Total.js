import React from 'react';
import { useSelector } from "react-redux";
import { Typography } from '@material-ui/core';

import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { COLOR_PRIMARY } from "../../constants";

export default function Total(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const promoCode = props.promoCode;
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    let total = props.value - (promoCode ? promoCode.reduction_amount : 0) + 2000;
    if (total <= 0) {
        total = 0;
    }

    return (
        <div className={props.className + ' bg-white px-2'} >
            <Typography
                component="span"
                variant="body1"
                color="textPrimary"
                className={'d-flex ' + flexRowClassName}
            >
                <Translate value="form:total:label" />
            </Typography>

            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                className={'d-flex ' + flexRowClassName}
            >
                <MoneyFormatter value={props.value} />
            </Typography>

            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                className={'d-flex ' + flexRowClassName}
            >
                <MoneyFormatter value={2000} />
                <span className="mx-2"></span>
                <Translate value="cart:delivery:label" />
            </Typography>

            {! promoCode ? '' :
// TODO: on click on promo code show dialog displaying all info about it
                <span>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        style={{ color: COLOR_PRIMARY }}
                        className={'d-flex ' + flexRowClassName}
                    >
                        - <MoneyFormatter value={(promoCode ? promoCode.reduction_amount : 0)} />
                        <span className="mx-2"></span>
                        <Translate value="cart:promo_code:label" />
                    </Typography>
                     <Typography
                         component="span"
                         variant="body2"
                         color="textPrimary"
                         className={'d-flex ' + flexRowClassName}
                     >
                        <MoneyFormatter value={total} />
                    </Typography>
                </span>
            }
        </div>
    );
}
