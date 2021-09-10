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

/**
 *
 * @param phone {string}
 *
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
    phone = phone.replace(' ', '');
    const match = phone.match(/(\+216)([0-9]{2})([0-9]{3})([0-9]{3})/)
    if (! match) {
        return phone;
    }

    return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
};



/**
 * Formats a unixTimestamp to be shown in the following format ('d/m/y') in client timezone
 *
 * @param unixTimestamp {int}
 *
 * @returns {string} formatted date
 */
export const formatDate = (unixTimestamp) => {
    const date = (new Date(unixTimestamp * 1000));
    const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
    let month = date.getMonth() + 1;
    month = month.toString().length > 1 ? month : '0' + month;

    return day + '/' + month + '/' + date.getFullYear().toString();
};

/**
 * Formats a timestamp to be shown in the following format ('H\hi') in client timezone
 *
 * @param timestamp {int}
 *
 * @returns {string} formatted date
 */
export const formatTime = (timestamp) => {
    const date = (new Date(timestamp * 1000));
    let hours = date.getHours();
    hours = hours.toString().length > 1 ? hours : '0' + hours;
    let  minutes = date.getMinutes();
    minutes = minutes.toString().length > 1 ? minutes : '0' + minutes;

    return hours + ':' + minutes;
}

/**
 * Formats a timestamp to be shown in the following format ('d.m.y H\hi') in client timezone
 *
 * @param timestamp {int}
 *
 * @returns {string} formatted date
 */
export const formatTimeDate = (timestamp) => {
    return  formatTime(timestamp) + ' ' + formatDate(timestamp);
};
