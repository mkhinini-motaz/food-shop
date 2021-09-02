import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Button, List } from '@material-ui/core';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

import { BASE_BACKEND_URL, COMPONENT_SHOW_DELAY, PRODUCT } from '../../constants';
import Product from './Product';
import MoneyFormatter from '../common/MoneyFormatter';
import PromoCode from "./PromoCode";
import Total from "./Total";
import AdditionalNote from "./AdditionalNote";
import {getShopTransporters, showOrderDialog, showTransporterDialog} from "../../store/actions";

function productInfoForOrderDisplay(product) {
    return {
        id: product.id,
        name: product.name,
        type: product.type,
        product_count: product.product_count,
        option_groups: product.option_groups || [],
        photo: BASE_BACKEND_URL + product.photo,
        price: <MoneyFormatter value={product.price} />,
        total: <MoneyFormatter value={product.price * product.product_count} />,
    };
}

export default function ProductList(props) {
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const marginXForBikeIcon  = selectedLangWriteFrom === 'right' ? 'ml-auto' : 'mr-auto';
    let productCartItemComponents = [];
    let showDelay = 0;
    let totalPrice = 0;
    const products = props.order.products || [];
    const lastProductInCartIndex = products.length - 1;
    let product;
    for (let index in products) {
        product = products[index];
        productCartItemComponents.push(<Product
            key={'product-cart-item-' + product.id + (product.type === PRODUCT.TYPE_WITH_OPTIONS ? '-' + Math.random() : '')}
            showDelay={showDelay}
            minifiedDisplay={props.showProductPhotos !== false}
            product={productInfoForOrderDisplay(product)}
            hideDivider={parseInt(index) === lastProductInCartIndex}
        />);

        totalPrice += product.price * product.product_count;
        showDelay += COMPONENT_SHOW_DELAY;
    }


    const transporterIconOnClick = () => {
        dispatch(getShopTransporters({ page: 1, perPage: 20, orderBy: 'created_at', orderDirection: 'desc' }));
        dispatch(showTransporterDialog(props.order));
    };
    const headerActions = [
        (<Button className={marginXForBikeIcon } onClick={transporterIconOnClick} key={'delivery_icon_' + props.order.id} style={{ borderRadius: '100% 50% 100% 50%' }}>
            <DirectionsBikeIcon />
        </Button>),
    ];
    return (
        <div>
            <div className="d-flex">
                {headerActions}
            </div>
            <List className="bg-white" >
                {productCartItemComponents}
            </List>
            <AdditionalNote additionalNote={props.order.additional_note} withMargins={props.showPromoCode !== false} showDelay={showDelay + COMPONENT_SHOW_DELAY * 2} />
            {props.showPromoCode === false ? '' : <PromoCode promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 3} />}
            {props.showTotal === false ? '' : <Total value={totalPrice} promoCode={props.order.promo_code} showDelay={showDelay + COMPONENT_SHOW_DELAY * 4} />}
        </div>
    );
}
