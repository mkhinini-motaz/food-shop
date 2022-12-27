import React from 'react';
import { LOCAL_CURRENCY, LOCAL, PRODUCT, ORDER, TYPES, SOURCES, TYPE_DELIVERY } from '../constants';
import { defaultLang, translate, translateFromObject} from '../i18n';


/**
 * @param amount                {number}
 * @param selectedLang          {string}
 * @param selectedLangWriteFrom {string}
 *
 * @returns {string}
 */
export function formatMoneyDisplay(amount, selectedLang = defaultLang.code, selectedLangWriteFrom = defaultLang.writeFrom) {
    let formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    if (selectedLangWriteFrom === 'right') {
        return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' +
            translate(LOCAL_CURRENCY, selectedLang, true);
    }

    return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' + translate(LOCAL_CURRENCY, selectedLang, true);
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
 * @param options      {array}
 * @param productCount {int}
 * @param selectedLang {string}
 */
export const optionsOutput = (options, productCount, selectedLang) => {
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    return options.map(option => {
        return translateFromObject(option.name, selectedLang, true) +
            (! option.quantity ? '' : ' ' + '+'.repeat(option.quantity)) +
            (! option.price ? '' : ' +' + formatter.format((option.price) / 1000).replace(LOCAL_CURRENCY, '') + translate(LOCAL_CURRENCY, selectedLang, true));
    }).join(', ')
};

/**
 *
 * @param phone {string}
 *
 * @returns {string}
 */
export const formatLocalPhoneNumber = (phone) => {
    phone = phone.replace(' ', '');
    const match = phone.match(/(\+216)([0-9]{2})([0-9]{3})([0-9]{3})/)
    if (! match) {
        return phone;
    }

    return match[2] + ' ' + match[3] + ' ' + match[4];
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
 * Formats a timestamp to be shown in the following format ('d.m.y H\hi') in client timezone
 *
 * @param timestamp {int}
 *
 * @returns {string} formatted date
 */
export const formatDateTime = (timestamp) => {
    return  formatDate(timestamp) + ' ' + formatTime(timestamp);
};

/**
 * // TODO: merge function with the one below
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
 * // TODO: merge function with the one above
 * @param product         {object}
 * @param productCartInfo {object}
 *
 * @returns {number}
 */
export const productPriceForDialog = (product) => {
    let price = product.price;
    if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
        for (let option of product.options) {
            if (option.price) {
                price += option.price;
            }
        }
    }

    return price * product.product_count;
};

/**
 * @param order         {object}
 * @param lang          {string}
 * @param langWriteFrom {string}
 * @returns {string}
 */
export const printableOrder = (order, lang, langWriteFrom) => { // TODO: use langWriteFrom
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    let result = '_________ Ghostchef _________\n';
    result += formatTimeDate(order.created_at) + '\n';
    result += '#Order: ' + String(order.id).slice(-2).padStart(2, '0') + '\n';
    result += '---------------\n\n';

    if (order.associated_phone) {
        result += 'Telephone : ' + order.associated_phone + '\n';
        result += '---------------\n\n';
    }

    if (order.additional_note) {
        result += order.additional_note + '\n';
        result += '---------------\n\n';
    }

    result += 'source : ' + translate(SOURCES[order.source], lang, true) + '\n';
    result += 'type : ' + translate(TYPES[order.type], lang, true) + '\n';
    result += '---------------\n\n';

    let choicesOutput = '';
    let choicesSummary = {};
    for (let choice of order.choices) {
        const product = choice.product;
        const categoryId = product.category_id;
        if (! choicesSummary[categoryId]) {
            choicesSummary[categoryId] = {
                name: product.category.name[lang],
                count: choice.product_count,
            };
        } else {
            choicesSummary[categoryId].count += choice.product_count;
        }
        choicesOutput += '- ' + choice.product_count + ' X ';
        choicesOutput += product.category.name[lang] + ' - ' + product.name[lang];
        choicesOutput += ' " ' +
            formatter.format(product.price / 1000)
                .replace(LOCAL_CURRENCY, '')
                .trim() +
            ' "\n';

        if (product.type !== PRODUCT.TYPE_WITH_OPTIONS) {
            continue;
        }

        for (let option of choice.options) {
            choicesOutput += '  ' + '*'.repeat(2) + ' ' + option.name[lang] + ' ' + '+'.repeat(option.quantity || 0);
            if (option.price) {
                choicesOutput += ' " ' + formatter.format(option.price / 1000).replace(LOCAL_CURRENCY, '').trim() + ' "\n';
            }
            choicesOutput += '\n';
        }
    }

    for (let category of Object.values(choicesSummary)) {
        result += category.count + ' ' + category.name + '\n';
    }
    result += '---------------\n\n' + choicesOutput + '---------------\n\n';

    if (order.promo_code) {
        result += '\n' + translate('cart:promo_code:label', lang, true);
        result += ' " -' + formatter.format(order.promo_code.reduction_amount / 1000).replace(LOCAL_CURRENCY, '').trim() + ' "\n';
    }

    result += translate('form:total:label', lang, true) + ' : ';
    result += '" ' + formatter.format(order.total_price / 1000).replace(LOCAL_CURRENCY, '').trim() + ' "\n';

    if (order.type === ORDER.TYPE_DELIVERY) {
        result += translate('cart:delivery:label', lang, true) + ' : *****\n';
    }

    result += '\nMerci !\n';
    result += 'A la prochaine !\n';

    return result;
};

/**
 * @param products        {array}
 * @param address         {object}
 * @param promoCode       {object}
 * @param associatedPhone {string}
 * @param additionalNote  {string}
 * @param deliveryFee     {int}
 * @param isPayed
 * @param type
 * @param source
 *
 * @returns {object}
 */
export const cartReducerDataToOrderSubmitData = ({ products, address, promoCode, associatedPhone, deliveryFee, additionalNote, isPayed, type, source }) => {
    const data = {
        delivery_latitude: address.lat,
        delivery_longitude: address.lng,
    };

    if (associatedPhone) {
        data.associated_phone = associatedPhone;
    }
    if (deliveryFee) {
        data.delivery_fee = deliveryFee;
    }
    if (additionalNote) {
        data.additional_note = additionalNote;
    }
    if (promoCode) {
        data.promo_code_id = promoCode.id;
    }
    if (isPayed) {
        data.is_payed = !! isPayed ? 1 : 0;
    }
    if (type) {
        data.type = type;
    }
    if (source) {
        data.source = source;
    }

    const productsToSubmit = [];
    let productToSubmit;
    for (let product of products) {
        productToSubmit = {
            id: product.product_id,
            product_count: product.product_count,
        };

        if (product.options) {
            productToSubmit.options = [];
            for (let option of product.options) {
                productToSubmit.options.push({
                    id: option.id,
                    quantity: option.quantity,
                });
            }
        }

        productsToSubmit.push(product);
    }
    data.products = productsToSubmit;
    return data;
};


/**
 * @param optionGroup {object}
 *
 * @returns {{severity: string, messageParams: {optionGroupName: *, optionCount: *}, message: string}}
 * @constructor
 */
export const SnackBarErrorMinOptions = optionGroup => ({
    message: 'option:min:count',
    messageParams: {
        optionCount: optionGroup.min_options,
        optionGroupName: optionGroup.name,
    },
    severity: 'error'
});

/**
 * @param optionGroup {object}
 *
 * @returns {{severity: string, messageParams: {optionGroupName: *, optionCount: *}, message: string}}
 * @constructor
 */
export const SnackBarErrorMaxOptions = optionGroup => ({
    message: 'option:max:count',
    messageParams: {
        optionCount: optionGroup.max_options,
        optionGroupName: optionGroup.name,
    },
    severity: 'error'
});


/**
 * @param options {array}
 */
export const indexOptionsByGroup = options => {
    const indexedOptions = {};
    for (let option of options) {
        if (Array.isArray(indexedOptions[option.option_group_id])) {
            indexedOptions[option.option_group_id].push(option);
        } else {
            indexedOptions[option.option_group_id] = [ option ];
        }
    }

    return indexedOptions;
};


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

/**
 * @param polygon {array}
 *
 * @returns {array}
 */
export function arrayPolygonToObjects(polygon) {
    return polygon.map(coordinates => ({ lat: coordinates[0], lng: coordinates[1] }));
}

/**
 * @param objects {array}
 *
 * @returns {array}
 */
export function objectsPolygonToArray(objects) {
    return objects.map(coordinates => [ coordinates.lat, coordinates.lng]);
}
