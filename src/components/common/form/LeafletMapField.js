import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, } from 'react-leaflet'
import { MAP_BOX_API_KEY } from "../../../constants";

const center = [
    35.729,
    10.579,
];
const zoom = 13;

// TODO: initial value
// TODO: fix error messages

export default function LeafletMapField(props) {
    return (
        <MapContainer onClick={(event) => console.log('map click : ', event)}
                      center={center}
                      zoom={zoom}
                      style={{ height: props.height || '300px', width: props.width || '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + MAP_BOX_API_KEY}
            />
            <Markers onChange={event => props.onChange({ lat: event.target.value[0], lng: event.target.value[1] })} />
        </MapContainer>
    );
}

function Markers(props) {
    const [position, setPosition] = useState([0, 0]);
    const map = useMapEvents({
        click(e) {
            props.onChange({ target: { value: [ e.latlng.lat, e.latlng.lng ] } });
            setPosition([ e.latlng.lat, e.latlng.lng ]);
        }, });

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('location : ',  position.coords.latitude, ', ', position.coords.longitude )
        setPosition([ position.coords.latitude, position.coords.longitude ]);
    });
    return <Marker position={position} />;
}
