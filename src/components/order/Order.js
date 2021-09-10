import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Chip, makeStyles, Typography } from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';

import AdditionalNote from "../cart/AdditionalNote";
import OrderStatus from "./OrderStatus";
import ProductList from "../cart/ProductList";
import PromoCode from "../cart/PromoCode";
import { getShopTransporters, showOrderStatusEditDialog, showTransporterDialog, } from "../../store/actions";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, } from "../../constants";
import { formatTimeDate, formatPhoneNumber } from "../../utils";

export default function Order(props) {
    const dispatch = useDispatch();
    const { order, index, showTotal = false, showPromoCode = false, showProductPhotos = false } = props;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const classes = makeStyles({
        orderCardRoot: {
            maxWidth: '300px',
            margin: 10,
            display: 'inline-block',
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
                <OrderStatus order={order} onClick={() => dispatch(showOrderStatusEditDialog(order))} key={'order_status_' + order.id} inline />
                <Typography variant="body2" component="span" className="mx-3 font_size_17px">
                    {formatTimeDate(order.created_at)}
                </Typography>
            </div>

            <div className={'px-2 text-' + selectedLangWriteFrom}>
                <Typography variant="h5" component="h4" color="primary" >
                    {order.client.first_name + ' ' + order.client.last_name}
                </Typography>
                <div className="d-block mb-2">
                    <a href={'tel:' + order.client.phone} style={{ textDecoration: 'none' }}>
                        <Chip className="pl-2"
                            icon={<PhoneInTalkIcon />}
                            style={{ backgroundColor: '#78c6a3', cursor: 'pointer' }}
                            label={<Typography variant="h6" color="primary" component="span" className="font-weight-bold m-1" >
                                {formatPhoneNumber(order.client.phone)}
                            </Typography>}
                        />
                    </a>
                </div>
            </div>


            <div className={'px-2 mt-1 d-flex justify-content-between text-' + selectedLangWriteFrom + flexRowClassName}>
                <Chip className="pl-2 h-auto"
                    icon={<DirectionsBikeIcon />}
                    onClick={transporterIconOnClick} key={'delivery_icon_' + order.id}
                    style={{ backgroundColor: '#fcbf49', cursor: 'pointer' }}
                    label={! order.shop_transporter ? '' :
                        <Typography variant="h6" color="primary" component="span" className="m-1 font-weight-bold white_space_pre_wrap" >
                            {order.shop_transporter.first_name + ' ' + order.shop_transporter.last_name}
                        </Typography>
                    }
                />
            </div>

            <ProductList order={order} showPromoCode={showPromoCode} showTotal={showTotal} showProductPhotos={showProductPhotos} />

            <AdditionalNote additionalNote={order.additional_note} withMargins={showPromoCode !== false} />
            {showPromoCode === false ? '' : <PromoCode promoCode={order.promo_code} />}
        </div>
    );
}
