import React, { useEffect } from 'react';
import Cart from "../../components/cart/Cart";
import { emptyCart } from "../../store/actions";
import { useDispatch } from "react-redux";

export default function Order(props) {
    const dispatch = useDispatch();
    dispatch(emptyCart());

    return <Cart />
}
