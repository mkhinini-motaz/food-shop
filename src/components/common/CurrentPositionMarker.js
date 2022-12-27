import React from 'react';
import { Marker } from '@react-google-maps/api';
import { useDispatch } from "react-redux";

import { showOrderDialog } from "../../store/actions";

export default function CurrentPositionMarker(props) {
    const [ currentPosition, setCurrentPosition ] = React.useState(false);
    navigator.geolocation.getCurrentPosition((googlePosition) => {
        const position = { lat: googlePosition.coords.latitude, lng: googlePosition.coords.longitude };
        setCurrentPosition(position);
    });
    return (
        <Marker position={currentPosition}
                icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#4285F4',
                    scale: 7,
                }}
        />
    );
}
