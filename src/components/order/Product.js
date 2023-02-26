import React from 'react';
import { useSelector } from 'react-redux';
import { BASE_BACKEND_URL, IMAGE_WITH_TEXT_TINT, PRODUCT } from "../../constants";
import TranslateField from "../common/TranslateField";
import QuantityActionButton from "../common/QuantityActionButton";
import { useDispatch } from "react-redux";
import {
    deleteCartProductTypeWithOptions,
    setCartProductTypeFixed,
    showConfirmDialog, showProductCreateDialog, showProductDeleteDialog,
    showSnackbar, updateCountCartProductTypeWithOptions
} from "../../store/actions";
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { productPrice } from "../../utils";

export default function Product(props) {
    const dispatch = useDispatch();
    const orderInProgress       = useSelector(state => state.CartReducer.orderInProgress);
    const productsInCart        = useSelector(state => state.CartReducer.products);
    const selectedLang          = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const productInfo = productsInCart.filter(productInCart => productInCart.product_id === props.product.id).shift();
    const product     = props.product;
    const productCountInCart = useSelector(state => {
        if (product.type === PRODUCT.TYPE_FIXED || product.type === PRODUCT.TYPE_WEIGHTABLE) {
            const fixedProduct = state.CartReducer.products
                .find(productInfo => productInfo.product_id === product.id) ||
                { product_count: 0 };
            return fixedProduct.product_count;
        }

        if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
            const products = state.CartReducer.products.filter(element => element.product_id === product.id);
            if (0 === products.length) {
                return 0;
            }

            let productCount = 0;
            for (let cartProduct of products) {
                productCount += cartProduct.product_count;
            }
            return productCount;
        }
    });

    const productKey = 'product-cart-item-' + product.id + '-quantity-action-button' +
        (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '');

    const flexRowClassName = ' flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse ' : '');
    const quantityActionButtonFlexRowClassName = selectedLangWriteFrom === 'right' ? ' d-flex flex-row-reverse justify-content-end ' : '';


    const quantityButtonOnClick = (newValue, addedValue) => {
        if (product.type === PRODUCT.TYPE_FIXED || product.type === PRODUCT.TYPE_WEIGHTABLE) {
            return dispatch(setCartProductTypeFixed({ product_id: product.id, product_count: newValue }));
        }

        if (product.type === PRODUCT.TYPE_WITH_OPTIONS) {
            if (addedValue > 0) {
                return dispatch(showProductCreateDialog(product));
            }
            return dispatch(showProductDeleteDialog(product));
        }
    };

    return (
        <div className={'col-6 col-sm-4 col-md-2 p-1 text-center'}>
            <div className={"p-2"}
                 style={{
                     backgroundImage: IMAGE_WITH_TEXT_TINT + ', url(' + BASE_BACKEND_URL + product.photo + ')',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     borderRadius: '15px',
                 }}
            >
                <h3><TranslateField value={product.name}></TranslateField></h3>

                <QuantityActionButton
                    key={productKey}
                    classes={{ root: quantityActionButtonFlexRowClassName }}
                    count={productCountInCart}
                    textAlign={'center'}
                    onClick={quantityButtonOnClick}
                    lang={selectedLang}
                    forWeight={product.type === PRODUCT.TYPE_WEIGHTABLE}
                    bigSize
                />
            </div>
        </div>
    );
};

// TODO: use classes instead
function productInfoForCartItem(product, productCartInfo) {
    return {
        id: product.id,
        category: product.category,
        id_in_cart: productCartInfo.id_in_cart,
        name: product.name,
        type: product.type,
        price: product.price,
        product_count: productCartInfo.product_count || 0,
        options: productCartInfo.options || [],
        photo: BASE_BACKEND_URL + product.photo,
        total: <MoneyFormatter value={productPrice({ ...product, product_count: productCartInfo })} />,
    };
}
