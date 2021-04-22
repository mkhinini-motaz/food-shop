import { SELECTED_LANG_NAME_IN_WINDOW } from '../../constants';
import { SET_LANG, PERSIST_REHYDRATE } from '../actions';
import { availableLangs, defaultLang } from '../../i18n';

export const initialI18nReducerState = {
    selectedLang: defaultLang.code,
    selectedLangWriteFrom: defaultLang.writeFrom,
    availableLangs,
};

window[SELECTED_LANG_NAME_IN_WINDOW] = defaultLang.code;

export default (state = initialI18nReducerState, action) => {
    if (action.type === PERSIST_REHYDRATE &&  action.payload) {
        window[SELECTED_LANG_NAME_IN_WINDOW] = action.payload.I18nReducer.selectedLang;
        return { ...action.payload.I18nReducer, availableLangs };
    }

    if (action.type === SET_LANG) {
        window[SELECTED_LANG_NAME_IN_WINDOW] = action.payload;
        const selectedLangWriteFrom = availableLangs[action.payload] ?
            availableLangs[action.payload].writeFrom :
            defaultLang.writeFrom;

        return { ...state, selectedLangWriteFrom, selectedLang: action.payload }
    }

    return state;
};
