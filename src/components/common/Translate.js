import React from 'react';
import { useSelector } from 'react-redux'

import { translate } from '../../i18n';

export default function Translate(props) {
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const textOnly = props.textOnly || false;
    return translate(props.value, selectedLang, textOnly);
}
