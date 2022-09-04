import React from 'react';
import Cart from "../../components/cart/Cart";
import axios from "axios";
import { BASE_SHOP_API_URL } from "../../constants";
import { useDispatch } from "react-redux";
import {
    emptyCart,
    setAdditionalNote,
    setAssociatedPhone,
    setCartProductTypeWithOptions, setIsPayed,
    setSource,
    setType
} from "../../store/actions";

export default function EditOrder(props) {
    const dispatch = useDispatch();
    axios.get(BASE_SHOP_API_URL + '/order/' + props.orderId)
        .then((response) => {
            dispatch(emptyCart());
            const order = response.data.data;
            for (const choice of order.choices) {
                dispatch(setCartProductTypeWithOptions({ product_id: choice.product_id, product_count: choice.product_count, options: choice.options }));
                dispatch(setSource(order.source));
                dispatch(setType(order.type));
                dispatch(setAssociatedPhone(order.associated_phone));
                dispatch(setAdditionalNote(order.additional_note));
                dispatch(setIsPayed(order.is_payed));
            }
        });

    return <Cart orderId={props.orderId} />;
};

