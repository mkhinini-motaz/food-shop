import React from 'react';

import { useSelector } from 'react-redux'

import { translate } from '../../i18n';
import { LOCAL, LOCAL_CURRENCY } from "../../constants";

export default function MoneyFormatter(props) {
    const selectedLang          = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    if (selectedLangWriteFrom === 'right') {
        return (
            <span className="d-flex flex-row-reverse">
                <span className={'translated_' + selectedLang}>
                    {formatter.format(props.value / 1000).replace(LOCAL_CURRENCY, '')}
                </span>
                <span className={'translated_' + selectedLang}>
                    {translate(LOCAL_CURRENCY, selectedLang, true)}
                </span>
            </span>
        )
    }

    return (
        <span>
            {formatter.format(props.value / 1000).replace(LOCAL_CURRENCY, '') + ' ' + translate(LOCAL_CURRENCY, selectedLang, true)}
        </span>
    );
}
