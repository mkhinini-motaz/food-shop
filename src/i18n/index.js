import React from 'react';

import fr from './fr.json'
import en from './en.json'
import tn from './tn.json'
import ar from './ar.json'

export const i18n = { fr, en, tn, ar, };

export const defaultLang = { name: 'Français', code: 'fr', writeFrom: 'left' };

export const availableLangs = {
    fr: defaultLang,
    en: { name: 'English',  code: 'en', writeFrom: 'left' },
    tn: { name: 'Tounsi',   code: 'tn', writeFrom: 'left' },
    ar: { name: 'عربى',     code: 'ar', writeFrom: 'right' },
};

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {string} translationKey
 * @param {string} languageCode
 * @param {boolean} textOnly
 *
 * @returns {string}
 */
export function translate(translationKey, languageCode, textOnly = false) {
    const translations = i18n[languageCode];
    if (! translations || typeof translations !== 'object') {
        return translationKey;
    }

    const translatedValue = translations[translationKey];
    if (! translatedValue || typeof translatedValue !== 'string') {
        return translationKey;
    }

    if (textOnly) {
        return translatedValue;
    }
    return <span className={'translated_' + languageCode}>{translatedValue}</span>;
}

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {object} object
 * @param {string} field
 * @param {string} languageCode
 * @param {bool}   textOnly
 *
 * @returns {string}
 */
export function translateField(object, field, languageCode, textOnly = false) {
    if (! object || Object.keys(object).length === 0 || ! field) {
        return '';
    }

    const fieldTranslations = object[field];
    if (textOnly) {
        return fieldTranslations[languageCode] || fieldTranslations[Object.keys(fieldTranslations)[0]];
    }

    return (<span className={'translated_' + languageCode}>
        {fieldTranslations[languageCode] || fieldTranslations[Object.keys(fieldTranslations)[0]]}
    </span>);
}
