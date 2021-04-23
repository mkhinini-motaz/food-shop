import React, {useState} from 'react';
import { GoogleMap as BaseGoogleMap, Marker, LoadScript } from '@react-google-maps/api';

import { GOOGLE_MAP_API_KEY } from "../../constants";
import OrderMarker from "./OrderMarker";

export default function GoogleMap(props) {
    const containerStyle = {
        height: props.height || '300px',
        width: props.width || '100%'
    };

    const [center, setCenter] = useState({ lat: 35.729, lng: 10.579, });
    const [zoom, setZoom] = useState(props.zoom || 13.5);

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} >
            <BaseGoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false
                }}
            >
                {props.orders.map(order => <OrderMarker key={'order_' + order.id} order={order} />)}
            </BaseGoogleMap>
        </LoadScript>
    );
}
