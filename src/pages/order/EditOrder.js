import React from 'react';
import axios from "axios";
import { batch, useDispatch } from "react-redux";
import Cart from "../../components/cart/Cart";
import { BASE_SHOP_API_URL } from "../../constants";
import { emptyCart, setAdditionalNote, setAssociatedPhone, setCartProductTypeWithOptions, setCartPromoCode, setDeliveryFee, setIsLoading, setIsPayed, setSource, setType, } from "../../store/actions";

export default function EditOrder(props) {
    const dispatch = useDispatch();
    dispatch(setIsLoading(true));
    axios.get(BASE_SHOP_API_URL + '/order/' + props.orderId)
        .then((response) => {
            dispatch(emptyCart());
            const order = response.data.data;
            batch(() => { // TODO: remove after update to react 18
                for (const choice of order.choices) {
                    dispatch(setCartProductTypeWithOptions({
                        product_id: choice.product_id,
                        product_count: choice.product_count,
                        options: choice.options,
                    }));
                }
                dispatch(setSource(order.source));
                dispatch(setType(order.type));
                dispatch(setAssociatedPhone(order.associated_phone));
                dispatch(setDeliveryFee(order.delivery_fee));
                dispatch(setCartPromoCode(order.promo_code));
                dispatch(setAdditionalNote(order.additional_note));
                dispatch(setIsPayed(order.is_payed));
            });
            dispatch(setIsLoading(false));
        });

    return <Cart orderId={props.orderId} />;
};

