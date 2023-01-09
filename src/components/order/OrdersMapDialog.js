import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, IconButton, DialogContent, makeStyles, } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import Translate from '../common/Translate';
import GoogleMap from '../common/GoogleMap';
import { hideOrdersMapDialog } from "../../store/actions/ordersMapDialog";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, IMAGE_WITH_TEXT_TINT } from "../../constants";
import CurrentPositionMarker from "../common/CurrentPositionMarker";
import OrderMarker from "../common/OrderMarker";
import { GoogleMap as BaseGoogleMap } from "@react-google-maps/api";
import Directions from "../common/Directions";

export default function OrdersMapDialog(props) {
    const { isVisible, order } = props;
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const mapCenter = {
        lat: parseFloat(order.delivery_latitude),
        lng: parseFloat(order.delivery_longitude),
    };

    const textAlign = selectedLangWriteFrom === 'right' ? ' text-right ' : ' ';

    const classes = makeStyles({
        closeButton: {
            position: 'absolute',
            [selectedLangWriteFrom === 'right' ? 'left' : 'right']: '0.5em',
            top: '0.5em',
            color: '#36363666',
            backgroundColor: '#9e9e9e',
            zIndex: 3,
        },
    })();

    const [ currentPosition, setCurrentPosition ] = React.useState({ lat: 0, lng: 0 });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((googlePosition) => {
            const position = { lat: googlePosition.coords.latitude, lng: googlePosition.coords.longitude };
            if (currentPosition.lat === 0) {
                setCurrentPosition(position);
            }
        });
    }, []);

    return (
        <Dialog
            fullWidth
            open={isVisible}
            onClose={() => dispatch(hideOrdersMapDialog())}
        >
            <DialogContent className={textAlign + 'p-0'}>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(hideOrdersMapDialog())}>
                    <CloseIcon />
                </IconButton>
                <div>
                    <GoogleMap center={mapCenter} height={"90vh"} width={"100%"} zoom={15}>
                        <CurrentPositionMarker />
                        <OrderMarker key={'order_' + order.id} order={order} />
                        <Directions origin={currentPosition} destination={{ lat: order.delivery_latitude, lng: order.delivery_longitude }} />
                    </GoogleMap>
                </div>
            </DialogContent>
        </Dialog>
    );
}
