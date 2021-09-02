import React from 'react';
import { useSelector } from 'react-redux'
import { translateFromObject } from "../../i18n";

export default function TranslateField(props) {
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    return translateFromObject(props.value, selectedLang, props.textOnly || false)
}
