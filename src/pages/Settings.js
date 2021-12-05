import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import DescriptionIcon from '@material-ui/icons/Description';

import GoogleMap from "../components/common/GoogleMap";
import Order from "../components/order/Order";
import Translate from "../components/common/Translate";
import Tabs from "../components/common/Tabs";
import { fetchShopUserProfile, getCurrentOrders, updateShopMenuLang } from "../store/actions";
import {
    BOX_SHADOW_CSS_RULE, COLOR_PRIMARY,
    COMPONENT_SHOW_DELAY,
    FORM_FIELD_TYPE_EMAIL, FORM_FIELD_TYPE_I18N_SELECT,
    FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_SUBMIT
} from "../constants";
import Form from "../components/common/form/Form";

export default function Settings(props) {
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const menuDisplayedLang = useSelector(state => state.AuthReducer.authShopUser.shop?.menu_displayed_lang);

    useEffect(() => {
        dispatch(fetchShopUserProfile())
    }, [dispatch]);

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
            <Typography variant="h2" component="h2" color="primary" align={selectedLangWriteFrom}>
                <Translate value="common:settings" textOnly={true} />
            </Typography>
            {! menuDisplayedLang ? '' :
                <Form
                    initialValue={{ menu_displayed_lang: menuDisplayedLang }}
                    fieldDescriptions={formFieldDescriptions}
                    onSubmit={formData => {dispatch(updateShopMenuLang(formData))}}
                />
            }
        </div>
    );
}
