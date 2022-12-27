import React from 'react';
import { GoogleMap as BaseGoogleMap, LoadScript } from '@react-google-maps/api';

import { GOOGLE_MAP_API_KEY } from "../../constants";
import OrderMarker from "./OrderMarker";
import CurrentPositionMarker from "./CurrentPositionMarker";

export default function GoogleMap(props) {
    const containerStyle = {
        height: props.height || '300px',
        width: props.width || '90vw'
    };

    const center = props.center || { lat: 35.729, lng: 10.579, }; // TODO: get from authUser.shop
    const zoom = props.zoom || 13.5;

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
                <CurrentPositionMarker />
                {props.orders.map((order, index) => <OrderMarker key={'order_' + order.id} order={order} />)}
            </BaseGoogleMap>
        </LoadScript>
    );
}
