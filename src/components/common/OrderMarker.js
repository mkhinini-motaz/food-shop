import React, {useState} from 'react';
import { GoogleMap as BaseGoogleMap, Marker, LoadScript } from '@react-google-maps/api';

import { GOOGLE_MAP_API_KEY } from "../../constants";
import {useDispatch} from "react-redux";
import {showOrderDialog} from "../../store/actions";

export default function OrderMarker(props) {
    const dispatch = useDispatch();
    console.log('order : ', props)
    const position = {
        lat: parseFloat(props.order.delivery_latitude),
        lng: parseFloat(props.order.delivery_longitude),
    };

    return (
        <Marker position={position} onClick={(event) => dispatch(showOrderDialog(props.order))} />
    );
}
