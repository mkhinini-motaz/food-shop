import React from 'react';

import {
    FORM_FIELD_TYPE_TEXT,
    FORM_FIELD_TYPE_PHONE,
    FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_EMAIL,
    FORM_FIELD_TYPE_SUBMIT,
    FORM_FIELD_TYPE_SLIDER,
    FORM_FIELD_TYPE_I18N_SELECT
} from '../../../constants';

import PhoneField from './PhoneField';
import TextField from './TextField';
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import SubmitButton from './SubmitButton';
import Slider from './Slider';
import I18nSelectField from "./I18nSelectField";

export default function FormField(props) {
    const commonClassName = 'w-100 pb-2';
    switch (props.type) {
        case FORM_FIELD_TYPE_PASSWORD:
            return <PasswordField className={commonClassName} {...props} />;

        case FORM_FIELD_TYPE_PHONE:
            return <PhoneField className={commonClassName} {...props} />;

        case FORM_FIELD_TYPE_EMAIL:
            return <EmailField className={commonClassName} {...props} />;

        case FORM_FIELD_TYPE_SLIDER:
            return <Slider className={commonClassName} {...props} />;

        case FORM_FIELD_TYPE_I18N_SELECT:
            return <I18nSelectField className={commonClassName}  {...props} />;

        case FORM_FIELD_TYPE_SUBMIT:
            return <SubmitButton {...props} />;

        case FORM_FIELD_TYPE_TEXT:
        default:
            return <TextField className={commonClassName} {...props} />;
    }
}
