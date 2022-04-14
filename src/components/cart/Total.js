import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';

import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";
import { productPrice, productPriceForDialog } from "../../utils";

export default function Total(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const promoCode = useSelector(state => state.CartReducer.promoCode);
    const [ isShown, setIsShown ] = React.useState(false);
    const deliveryFee = 0;// TODO: implement

    let product;
    let totalProducts = 0;
    for (let productCartInfo of props.productsInfo) {
        product = props.products.filter(productObject => productObject.id === productCartInfo.product_id)
            .shift();
        if (! product) {
            continue;
        }
        totalProducts += productPriceForDialog({ ...product, product_count: productCartInfo.product_count, options: productCartInfo.options });
    }

    let total = totalProducts - (promoCode ? promoCode.reduction_amount : 0) + deliveryFee;
    if (total < 0) {
        total = 0;
    }

    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' bg-white my-2 p-3 border_radius_15'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <Typography
                    component="span"
                    variant="body1"
                    color="textPrimary"
                    className={'d-flex align-items-center  ' + flexRowClassName}
                >
                    <MoneyFormatter value={totalProducts} />
                </Typography>

{/*
                <Typography
                    component="span"
                    variant="body1"
                    color="textPrimary"
                    className={'d-flex align-items-center ' + flexRowClassName}
                >
                    <MoneyFormatter value={deliveryFee} />
                    <span className="mx-2"></span>
                    <Translate value="cart:delivery:label" />
                </Typography>
*/}

                {! promoCode ? '' :
                    <Typography
                        component="span"
                        variant="body1"
                        color="textSecondary"
                        style={{ color: COLOR_PRIMARY }}
                        className={'d-flex align-items-center  ' + flexRowClassName}
                    >
                        <span className="mx-1">-</span>
                        <MoneyFormatter value={(promoCode ? promoCode.reduction_amount : 0)} />
                        <span className="mx-2"></span>
                        <Translate value="cart:promo_code:label" />
                    </Typography>
                }

                <Typography
                    component="span"
                    variant="body1"
                    color="textPrimary"
                    className={'d-flex align-items-center  ' + flexRowClassName}
                >
                    <MoneyFormatter value={total} />
                    <span className="mx-2"></span>
                    <Translate value="form:total:label" />
                </Typography>
            </div>
        </Collapse>
    );
}
