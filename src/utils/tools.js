import React from 'react';
import { LOCAL_CURRENCY, LOCAL, PRODUCT, ORDER } from '../constants';
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
 * @param productCount {int}
 * @param selectedLang {string}
 */
export const optionGroupsOutput = (optionGroups, productCount, selectedLang) => {
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    return optionGroups.map(optionGroup =>
        optionGroup.options.map(option => {
            return translateFromObject(option.name, selectedLang, true) +
                (! option.quantity ? '' : ' ' + '+'.repeat(option.quantity)) +
                (! option.price ? '' : ' +' + formatter.format((option.price * productCount) / 1000).replace(LOCAL_CURRENCY, '') + translate(LOCAL_CURRENCY, selectedLang, true));
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

/**
 * @param product         {object}
 * @param productCartInfo {object}
 *
 * @returns {number}
 */
export const productPrice = (product) => {
    let price = product.price;
    if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
        for (let optionGroup of product.option_groups) {
            for (let option of optionGroup.options) {
                if (option.price) {
                    price += option.price;
                }
            }
        }
    }

    return price * product.product_count;
};

/**
 * @param order {object}
 * @returns {string}
 */
export const printableOrder = (order) => {
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    const lang = 'fr';
    let result = '_________ Ghostchef _________\n\n';
    let total  = 0;
    for (let product of order.products) {
        let productPrice = product.price;

        result += product.product_count + ' X ';
        result += product.category.name[lang] + ' - ' + product.name[lang];
        result += '" ' + formatter.format(product.price / 1000).replace(LOCAL_CURRENCY, '');
        result += ' ' + translate(LOCAL_CURRENCY, lang, true) + ' "\n';

        if (product.type !== PRODUCT.TYPE_WITH_OPTIONS) {
            continue;
        }

        for (let optionGroup of product.option_groups) {
            let starCount = 1;
            for (let option of optionGroup.options) {
                result += '*'.repeat(starCount) + ' ' + option.name[lang] + ' ' + '+'.repeat(option.quantity || 0);
                if (option.price) {
                    result += '" ' + formatter.format(option.price / 1000).replace(LOCAL_CURRENCY, '');
                    result += ' ' + translate(LOCAL_CURRENCY, lang, true) + ' "\n';
                    productPrice  += option.price;
                }
                result += '\n';
            }
        }

        total += productPrice * product.product_count;
    }

    if (order.promo_code) {
        total -= order.promo_code.reduction_amount;

        result += '\n' + translate('cart:promo_code:label', lang, true);
        result += ' " -' + formatter.format(order.promo_code.reduction_amount / 1000).replace(LOCAL_CURRENCY, '');
        result += ' ' + translate(LOCAL_CURRENCY, lang, true) + ' "\n';
    }

    if (order.type === ORDER.TYPE_DELIVERY) {
// TODO: dynamic delivery fee
        total += 2000;
        result += '\n' + translate('cart:delivery:label', lang, true) + ' " 2000 "' + '\n';
    }

    result += translate('form:total:label', lang, true) + ' : ';
    result += '" ' + formatter.format(total / 1000).replace(LOCAL_CURRENCY, '');
    result += ' ' + translate(LOCAL_CURRENCY, lang, true) + ' "\n';

    result += '\nMerci !\n';
    result += 'A la prochaine !\n';

    return result;
};
