import { combineReducers } from 'redux';

import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import OrderDialogReducer from './OrderDialogReducer';
import OrderReducer from './OrderReducer';
import ConfirmDialogReducer from './ConfirmDialogReducer';
import AuthReducer from './AuthReducer';
import I18nReducer from './I18nReducer';
import SnackbarReducer from './SnackbarReducer';

export default combineReducers({
    CategoryReducer,
    ProductReducer,
    OrderDialogReducer,
    OrderReducer,
    ConfirmDialogReducer,
    AuthReducer,
    I18nReducer,
    SnackbarReducer,
})
