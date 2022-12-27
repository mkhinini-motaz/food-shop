import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Polygon } from '@react-google-maps/api';

import { useDispatch, useSelector } from "react-redux";
import { arrayPolygonToObjects, objectsPolygonToArray } from "../../utils";
import { COLOR_PRIMARY, COLOR_SECONDARY, FORM_FIELD_TYPE_SUBMIT } from "../../constants";
import Form from "./form/Form";
import { updateShopServiceArea } from "../../store/actions/shop";
import Translate from "./Translate";

export default function ServiceAreaPolygon(props) {
    const shop = useSelector(state => state.ShopReducer.shop);
    const [serviceArea, setServiceArea] = useState(null);

    useEffect(() => {
        setServiceArea(arrayPolygonToObjects(shop.service_area));
    }, [shop.id]);

    const polygonRef = useRef(null);
    const listenersRef = useRef([]);

    // Call setPath with new edited path
    const onEdit = useCallback(() => {
        if (polygonRef.current) {
            const nextPath = polygonRef.current
            .getPath()
            .getArray()
            .map(latLng => {
                return { lat: latLng.lat(), lng: latLng.lng() };
            });
            setServiceArea(nextPath);
            props.onChange(nextPath);
        }
    }, [setServiceArea]);

    const onLoad = useCallback(
        polygon => {
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        },
        [onEdit]
    );

    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    return (
        <>
            <Polygon editable
                     onMouseUp={onEdit}
                     onLoad={onLoad}
                     onUnmount={onUnmount}
                     path={serviceArea}
                     options={{ strokeColor: COLOR_SECONDARY + '55', fillColor: COLOR_PRIMARY + '66' }}
            />

        </>
    );
};

