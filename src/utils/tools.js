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
 *
 * @param optionGroups {array}
 * @param selectedLang {string}
 */
export const optionGroupsOutput = (optionGroups, selectedLang) => {
    return optionGroups.map(optionGroup =>
        optionGroup.options.map(option => {
            return translateFromObject(option.name, selectedLang, true) +
                (! option.quantity ? '' : ' ' + '+'.repeat(option.quantity));
        }).join(', ')
    ).join(', ')
};
