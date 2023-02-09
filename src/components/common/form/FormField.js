import React from 'react';

import {
    FORM_FIELD_TYPE_TEXT,
    FORM_FIELD_TYPE_PHONE,
    FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_EMAIL,
    FORM_FIELD_TYPE_SUBMIT,
    FORM_FIELD_TYPE_SLIDER,
    FORM_FIELD_TYPE_I18N_SELECT,
    FORM_FIELD_TYPE_TRANSLATABLE_TEXT,
    FORM_FIELD_TYPE_IMAGE,
    FORM_FIELD_TYPE_SWITCH
} from '../../../constants';

import PhoneField from './PhoneField';
import TextField from './TextField';
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import SubmitButton from './SubmitButton';
import Slider from './Slider';
import I18nSelectField from "./I18nSelectField";
import TranslatableTextField from "./TranslatableTextField";
import ImageField from "./ImageField";
import SwitchField from "./SwitchField";

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

        case FORM_FIELD_TYPE_TRANSLATABLE_TEXT:
            return <TranslatableTextField className={commonClassName}  {...props} />;

        case FORM_FIELD_TYPE_IMAGE:
            return <ImageField className={commonClassName}  {...props} />;

        case FORM_FIELD_TYPE_SWITCH:
            return <SwitchField className={commonClassName}  {...props} />;

        case FORM_FIELD_TYPE_SUBMIT:
            return <SubmitButton {...props} />;

        case FORM_FIELD_TYPE_TEXT:
        default:
            return <TextField className={commonClassName} {...props} />;
    }
}
