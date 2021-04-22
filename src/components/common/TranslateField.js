import React from 'react';
import { useSelector } from 'react-redux'
import { translateField } from "../../i18n";

export default function TranslateField(props) {
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    return translateField(props.value, props.field, selectedLang, props.textOnly || false)
}
