import { combineReducers } from 'redux';

import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import OrderDialogReducer from './OrderDialogReducer';
import TransporterDialogReducer from './TransporterDialogReducer';
import OrderReducer from './OrderReducer';
import OrderStatusEditDialogReducer from './OrderStatusEditDialogReducer';
import ShopUserReducer from './ShopUserReducer';
import ConfirmDialogReducer from './ConfirmDialogReducer';
import AuthReducer from './AuthReducer';
import I18nReducer from './I18nReducer';
import SnackbarReducer from './SnackbarReducer';
import SideDrawerReducer from './SideDrawerReducer';
import CartReducer from './CartReducer';
import ProductDialogReducer from './ProductDialogReducer';

export default combineReducers({
    CategoryReducer,
    ProductReducer,
    OrderDialogReducer,
    OrderStatusEditDialogReducer,
    TransporterDialogReducer,
    OrderReducer,
    ShopUserReducer,
    ConfirmDialogReducer,
    AuthReducer,
    I18nReducer,
    SnackbarReducer,
    SideDrawerReducer,
    CartReducer,
    ProductDialogReducer,
})
