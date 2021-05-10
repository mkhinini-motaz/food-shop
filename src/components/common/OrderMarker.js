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
    const index = props.index || 1;

    return (
        <Marker position={position}
                onClick={(event) => dispatch(showOrderDialog(props.order))}
                label={{ text: index.toString(), color: 'white' }}
                color="white"
        />
    );
}
