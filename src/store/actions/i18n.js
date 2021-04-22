import { SET_LANG } from './types';

export function setLang(lang) {
    return { type: SET_LANG, payload: lang };
}