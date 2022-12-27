import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Divider, Typography } from '@material-ui/core';

import GoogleMap from "../components/common/GoogleMap";
import Translate from "../components/common/Translate";
import { fetchShopUserProfile, updateShopMenuLang } from "../store/actions";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, FORM_FIELD_TYPE_I18N_SELECT, FORM_FIELD_TYPE_SUBMIT } from "../constants";
import Form from "../components/common/form/Form";
import ServiceAreaPolygon from "../components/common/ServiceAreaPolygon";
import { updateShopServiceArea } from "../store/actions/shop";
import { objectsPolygonToArray } from "../utils";

export default function Settings(props) {
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const menuDisplayedLang = useSelector(state => state.AuthReducer.authShopUser.shop?.menu_displayed_lang);
    const [serviceArea, setServiceArea] = useState(null);

    useEffect(() => {
        dispatch(fetchShopUserProfile());
    }, [dispatch]);

    const submitFieldDescription =  [{
        type: FORM_FIELD_TYPE_SUBMIT,
        label: <Translate value="common:save" />,
        color: 'white',
        backgroundColor: COLOR_PRIMARY,
        isLoading: false,
    }];

    const formFieldDescriptions =  [
        {
            name: 'menu_displayed_lang',
            label: <Translate value="menu:language" />,
            type: FORM_FIELD_TYPE_I18N_SELECT,
        },
        {
            type: FORM_FIELD_TYPE_SUBMIT,
            label: <Translate value="common:save" />,
            color: 'white',
            backgroundColor: COLOR_PRIMARY,
            isLoading: false,
        },
    ];

    return (
        <div className={'bg-white text-center px-5 py-3 my-3 mx-auto w-md-75 w-sm-100'}>
            <Typography variant="h2" component="h1" color="primary" align={selectedLangWriteFrom}>
                <Translate value="common:settings" textOnly={true} />
            </Typography>
            {! menuDisplayedLang ? '' : <>
                <Typography variant="h3" component="h3" color="primary" align={selectedLangWriteFrom}>
                    <Translate value="common:menu_lang" textOnly={true} />
                </Typography>
                <Form
                    initialValue={{ menu_displayed_lang: menuDisplayedLang }}
                    fieldDescriptions={formFieldDescriptions}
                    onSubmit={formData => {dispatch(updateShopMenuLang(formData))}}
                />
            </>}

            <Divider />
            <Typography className={"my-2"} variant="h3" component="h3" color="primary" align={selectedLangWriteFrom}>
                <Translate value="common:service_area" textOnly={true} />
            </Typography>
            <div className={"p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <GoogleMap height={"80vh"} width={"100%"} center={{ lat: 35.729, lng: 10.579, }} >
                    <ServiceAreaPolygon onChange={setServiceArea} />
                </GoogleMap>
            </div>
            <Form
                fieldDescriptions={submitFieldDescription}
                onSubmit={() => {dispatch(updateShopServiceArea(objectsPolygonToArray(serviceArea)))}}
            />
        </div>
    );
}
