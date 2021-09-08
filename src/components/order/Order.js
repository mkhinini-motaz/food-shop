import React from 'react';
import ProductList from "../cart/ProductList";
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import {makeStyles} from "@material-ui/core";
import {COLOR_PRIMARY} from "../../constants";
import {useSelector} from "react-redux";

export default function Order(props) {
    const { order, index, showTotal = false, showPromoCode = false, showProductPhotos = false } = props;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const classes = makeStyles({
        orderCardRoot: {
            position: 'relative',
        },
        orderNumber: {
            backgroundColor: COLOR_PRIMARY,
            position: "absolute",
            color: 'white',
            zIndex: 3,
            textAlign: 'center',
            textTransform: 'uppercase',
            padding: 5,
            top: 0,
            [selectedLangWriteFrom === 'left' ? 'right' : 'left']: 0,
            minWidth: '35px',
            fontSize: '17px',
            fontWeight: '500',
            borderRadius: selectedLangWriteFrom === 'left' ? '0 15px 0 15px' : '15px 0 15px 0',
        },
    })();

    return (
        <div className={classes.orderCardRoot + ' bg-white my-2 p-2 border_radius_15 '}
             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
             key={'order_details_' + order.id}
        >
            <div className={classes.orderNumber}><span>{index + 1}</span></div>
            <ProductList order={order} showPromoCode={showPromoCode} showTotal={showTotal} showProductPhotos={showProductPhotos} />
        </div>
    );
}
