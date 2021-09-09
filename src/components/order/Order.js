import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Chip, makeStyles, Switch, Typography } from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AdditionalNote from "../cart/AdditionalNote";
import OrderStatus from "./OrderStatus";
import ProductList from "../cart/ProductList";
import PromoCode from "../cart/PromoCode";
import { getShopTransporters, showOrderStatusEditDialog, showTransporterDialog, } from "../../store/actions";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, } from "../../constants";
import { formatDateTime, formatPhoneNumber } from "../../utils";

export default function Order(props) {
    const dispatch = useDispatch();
    const [isDetailedViewEnabled, setIsDetailedViewEnabled] = useState(true);
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

    const transporterIconOnClick = () => {
        dispatch(getShopTransporters({ page: 1, perPage: 20, orderBy: 'created_at', orderDirection: 'desc' }));
        dispatch(showTransporterDialog(order));
    };

    const flexRowClassName = ' flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse ' : ' ');

    return (
        <div className={classes.orderCardRoot + ' bg-white my-2 p-2 border_radius_15 '}
             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
             key={'order_details_' + order.id}
        >
            <div className={classes.orderNumber}><span>{index + 1}</span></div>

            <div className={'px-2 d-flex align-items-center justify-content-between ' + flexRowClassName}>
                <OrderStatus order={order} onClick={() => dispatch(showOrderStatusEditDialog(order))} key={'order_status_' + order.id} />
                <Typography variant="body2" component="span" className="mx-4">
                    {formatDateTime(order.created_at)}
                </Typography>
            </div>

            <div className={'px-2 mb-1 d-flex justify-content-between text-' + selectedLangWriteFrom + flexRowClassName}>
                <Chip className="pl-2"
                    icon={<DirectionsBikeIcon />}
                    onClick={transporterIconOnClick} key={'delivery_icon_' + order.id}
                    style={{ backgroundColor: '#fcbf49', cursor: 'pointer' }}
                    label={
                        <Typography variant="h6" color="primary" component="span" className="font-weight-bold m-1" >
                            {order.shop_transporter.first_name + ' ' + order.shop_transporter.last_name}
                        </Typography>
                    }
                />
                <div className={'d-inline-flex align-items-center ' + flexRowClassName}>
                    {isDetailedViewEnabled ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon color="secondary" />}
                    <Switch checked={isDetailedViewEnabled} onChange={(event) => setIsDetailedViewEnabled(event.target.checked)} key={'order_enable_detailed_view_' + order.id} />
                </div>

            </div>

            <div className={'px-2 text-' + selectedLangWriteFrom}>
                <Typography variant="h4" component="h4" color="primary" >
                    {order.client.first_name + ' ' + order.client.last_name}
                </Typography>
                <div className="d-block mt-2">
                    <a href={'tel:' + order.client.phone} style={{ textDecoration: 'none' }}>
                        <Chip className="pl-2"
                            icon={<PhoneInTalkIcon />}
                            style={{ backgroundColor: '#caffbf', cursor: 'pointer' }}
                            label={
                                <Typography variant="h6" color="primary" component="span" className="font-weight-bold m-1" >
                                    {formatPhoneNumber(order.client.phone)}
                                </Typography>
                            }
                        />
                    </a>
                </div>

            </div>

            <ProductList order={order} showPromoCode={showPromoCode} showTotal={showTotal} showProductPhotos={showProductPhotos} detailedView={isDetailedViewEnabled} />

            <AdditionalNote additionalNote={order.additional_note} withMargins={showPromoCode !== false} />
            {showPromoCode === false ? '' : <PromoCode promoCode={order.promo_code} />}
        </div>
    );
}
