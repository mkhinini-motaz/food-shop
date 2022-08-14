import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Chip, FormControlLabel, makeStyles, Switch, Typography } from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import AdditionalNote from "../cart/AdditionalNote";
import OrderStatus from "./OrderStatus";
import ProductList from "../cart/ProductList";
import PromoCode from "../cart/PromoCode";
import {
    getShopTransporters, setIsPayed,
    showOrderStatusEditDialog,
    showSnackbar,
    showTransporterDialog, updateOrderIsPayed,
} from "../../store/actions";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, SOURCES, TYPES, } from "../../constants";
import { formatTime, formatPhoneNumber, printableOrder } from "../../utils";
import Translate from "../common/Translate";

export default function Order(props) {
    const dispatch = useDispatch();
    const { order, index, showTotal = false, showPromoCode = false, showProductPhotos = false } = props;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const products = order?.choices.map(choice => ({ ...choice.product, options: choice.options, product_count: choice.product_count }));

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

    const copyInviteCodeToClipboard = () => {
        navigator.clipboard.writeText(printableOrder(order, selectedLang, selectedLangWriteFrom));
        dispatch(showSnackbar({ message: 'common:copied' }))
    };

    const flexRowClassName = ' flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse ' : ' ');

    return (
        <div className={classes.orderCardRoot + ' bg-white my-2 pb-2 px-2 pt-3 border_radius_15 '}
             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
             key={'order_details_' + order.id}
        >
            <div className={classes.orderNumber}><span>{String(order.id).slice(-3).padStart(3, '0')}</span></div>

            <div className={'px-2 d-flex align-items-center justify-content-between ' + flexRowClassName}>
                <OrderStatus order={order} onClick={() => dispatch(showOrderStatusEditDialog(order))} key={'order_status_' + order.id} inline />
                <Chip color="secondary"
                      label={<Typography variant="h5" component="h5" className={'my-2'}>
                          {formatTime(order.created_at)}
                      </Typography>}
                />
            </div>

            <div className={'px-2 d-flex align-items-center justify-content-between ' + flexRowClassName}>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(event) => dispatch(updateOrderIsPayed(order.id, event.target.checked))}
                            color="primary"
                            checked={order.is_payed}
                        />
                    }
                    label={<Translate value={order.is_payed ? "order:is_payed" : "order:is_not_payed"}/>}
                />
                <Chip icon={<FileCopyIcon />}
                      label={<Translate value="common:copy" />}
                      clickable
                      color="primary"
                      onClick={copyInviteCodeToClipboard}
                />
            </div>

            {! order.associated_phone ? '' :
                <div className={'px-2 text-' + selectedLangWriteFrom}>
                    <div className="d-block mb-2">
                        <a href={'tel:' + order.associated_phone} style={{ textDecoration: 'none' }}>
                            <Chip className="pl-2 h-auto"
                                  icon={<PhoneInTalkIcon />}
                                  style={{ backgroundColor: '#78c6a3', cursor: 'pointer' }}
                                  label={<Typography variant="h6" color="primary" component="span" className="font-weight-bold m-1 white_space_pre_wrap" >
                                      {formatPhoneNumber(order.associated_phone)}
                                  </Typography>}
                            />
                        </a>
                    </div>
                </div>
            }


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

            <ProductList products={products}
                         showPromoCode={showPromoCode}
                         showTotal={showTotal}
                         showProductPhotos={showProductPhotos}
                         orderType={order.type}
                         detailedView />

            <div className={"px-2"}>
                <div className={'d-flex' + flexRowClassName}>
                    <Translate value={"order:source"}/>
                    <span className={'mx-2'}>:</span>
                    <Translate value={SOURCES[order.source]}/>
                </div>
                <div className={'d-flex' + flexRowClassName}>
                    <Translate value={"order:type"}/>
                    <span className={'mx-2'}>:</span>
                    <Translate value={TYPES[order.type]}/>
                </div>
            </div>

            <div className={"px-2"}>
                {! order.additional_note ? '' :
                    <Typography component={'h4'} >{order.additional_note}</Typography>
                }
            </div>

            {showPromoCode === false ? '' : <PromoCode promoCode={order.promo_code} />}
        </div>
    );
}
