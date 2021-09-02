import React from 'react';
import { LOCAL_CURRENCY, LOCAL } from '../constants';
import { defaultLang, translate, translateFromObject} from '../i18n';

/**
 * @param {int} amount
 * @param {string} selectedLang
 *
 * @returns {string}
 */
export function formatMoneyDisplay(amount, selectedLang = defaultLang.code, selectedLangWriteFrom = defaultLang.writeFrom) {
    let formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    if (selectedLangWriteFrom === 'right') {
        return (
            <span className="d-flex flex-row-reverse">
                <span>
                    {formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '')}
                </span>
                <span>
                    {translate(LOCAL_CURRENCY, selectedLang, true)}
                </span>
            </span>
        )
    }

    return (
        <span>
            {formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' + translate(LOCAL_CURRENCY, selectedLang, true)}
        </span>
    );
}

/**
 * @param {string} phone
 *
 * @returns {string} phone number without white spaces or parenthesis
 */
export function shortPhone(phone) {
    return phone.replace('(', '')
        .replace(')', '')
        .replace(/\s*/g, '',);
}

/**
 * @returns {string}
 */
export function shopUserAccessToken() {
    return 'Bearer ' + (localStorage.getItem('shop_user_access_token') || '');
}

/**
 * @param option            {object}
 * @param selectedLang          {string}
 * @param selectedLangWriteFrom {string}
 *
 * @returns {string}
 */
export const optionOutput = (option, selectedLang, selectedLangWriteFrom) => {
    let optionOutput = translateFromObject(option.name, selectedLang, true);
    if (option.quantity) {
        optionOutput += ' ' + '+'.repeat(option.quantity);
    }
    if (option.price) {
        optionOutput += ' (+' + formatMoneyDisplay(option.price, selectedLang, selectedLangWriteFrom) + ')';
    }
    return optionOutput;
};
