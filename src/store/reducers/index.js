import { combineReducers } from 'redux';

import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import ProductDialogReducer from './ProductDialogReducer';
import CartReducer from './CartReducer';
import ConfirmDialogReducer from './ConfirmDialogReducer';
import AuthReducer from './AuthReducer';
import I18nReducer from './I18nReducer';

export default combineReducers({
    CategoryReducer,
    ProductReducer,
    ProductDialogReducer,
    CartReducer,
    ConfirmDialogReducer,
    AuthReducer,
    I18nReducer,
})
