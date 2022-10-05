import React from 'react';
import { Marker } from '@react-google-maps/api';
import { useDispatch } from "react-redux";

import { showOrderDialog } from "../../store/actions";

export default function OrderMarker(props) {
    const dispatch = useDispatch();
    const position = {
        lat: parseFloat(props.order.delivery_latitude),
        lng: parseFloat(props.order.delivery_longitude),
    };
    const index = String(props.order.id).slice(-2).padStart(2, '0');

    return (
        <Marker position={position}
                onClick={(event) => dispatch(showOrderDialog(props.order))}
                label={{ text: index.toString(), color: 'white' }}
                color="white"
        />
    );
}
