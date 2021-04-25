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
    const iw = 70;
    const ih = 94;
    const index = props.index || 1;
    const googleMaps = window.google.maps;
    return (
        <Marker position={position}
                onClick={(event) => dispatch(showOrderDialog(props.order))}
                icon={{
                    url: `https://waqi.info/mapicon/${index}.30.png`,
                    anchor: new googleMaps.Point(iw / 4, ih / 2 - 5),
                    size: new googleMaps.Size(iw / 2, ih / 2),
                    scaledSize: new googleMaps.Size(iw / 2, ih / 2),
                }}
        />
    );
}
