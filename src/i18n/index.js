import React from 'react';

import fr from './fr.json'
import en from './en.json'
import tnar from './tnar.json'
import tnfr from './tnfr.json'
import ar from './ar.json'

export const i18n = { fr, en, tnar, tnfr, ar, };

export const availableLangs = {
    fr: { code: 'fr', writeFrom: 'left' },
    en: { code: 'en', writeFrom: 'left' },
    tnfr: { code: 'tn-fr', writeFrom: 'left' },
    tnar: { code: 'tn-ar', writeFrom: 'right' },
    ar: { code: 'ar', writeFrom: 'right' },
};

const navigatorLang = window.navigator.language.substr(0, 2);
export const defaultLang = availableLangs[navigatorLang] || availableLangs.fr;

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {string}  translationKey
 * @param {string}  languageCode
 * @param {bool}    textOnly
 * @param {object}  params
 *
 * @returns {string}
 */
export function translate(translationKey, languageCode, textOnly = false, params = {}) {
    const translations = i18n[languageCode];
    if (! translations || typeof translations !== 'object') {
        return translationKey;
    }

    let translatedValue = translations[translationKey];
    if (! translatedValue || typeof translatedValue !== 'string') {
        return translationKey;
    }

    for (let [paramName, paramI18n] of Object.entries(params)) {
        if (typeof paramI18n === 'object') {
            translatedValue = translatedValue.replace('${' + paramName + '}', translateFromObject(paramI18n, languageCode, true));
            continue;
        }

        translatedValue = translatedValue.replace('${' + paramName + '}', paramI18n);
    }

    if (textOnly) {
        return translatedValue;
    }
    return <span className={'translated_' + languageCode}>{translatedValue}</span>;
}

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {object} translationsObject
 * @param {string} languageCode
 * @param {bool}   textOnly
 *
 * @returns {string}
 */
export function translateFromObject(translationsObject, languageCode, textOnly = false) {
    if (! translationsObject || Object.keys(translationsObject).length === 0) {
        return '';
    }

    const result = translationsObject[languageCode] || translationsObject[Object.keys(translationsObject)[0]];
    if (textOnly) {
        return result;
    }

    return <span className={'translated_' + languageCode}>{result}</span>;
}
