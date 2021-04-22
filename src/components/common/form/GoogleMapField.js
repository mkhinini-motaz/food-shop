import React, {useState} from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

import { GOOGLE_MAP_API_KEY } from "../../../constants";

export default function GoogleMapField(props) {
    const containerStyle = {
        height: props.height || '300px',
        width: props.width || '100%'
    };

    const [center, setCenter] = useState({ lat: 35.729, lng: 10.579, });
    const [position, setPosition] = useState({ lat:0, lng: 0 });
    const [zoom, setZoom] = useState(props.zoom || 13);

    navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        setPosition(currentPosition);
        setTimeout(() => { // TODO: change into if mapIsShown execute function
            setCenter(currentPosition);
            setZoom(15);
        }, 1500);

    });

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false
                }}
                onClick={event => setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })}
            >
                <Marker position={position} />
            </GoogleMap>
        </LoadScript>
    );
}
