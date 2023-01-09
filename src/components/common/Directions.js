import React, { useState } from 'react';
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

export default function Directions(props) {
    const [response, setResponse] = useState(null);
    const { origin, destination } = props;

    return (
        <>
            <DirectionsService options={{ destination, origin, travelMode: 'DRIVING' }} callback={setResponse} />
            <DirectionsRenderer options={{ directions: response }} />
        </>
    );
};

