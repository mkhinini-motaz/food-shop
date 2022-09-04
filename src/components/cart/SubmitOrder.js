import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Collapse } from '@material-ui/core';

import Translate from "../common/Translate";
import Loader from "../common/Loader";
import {emptyCart, showConfirmDialog, showSnackbar, submitOrder} from "../../store/actions";
import { BOX_SHADOW_CSS_RULE } from "../../constants";

export default function SubmitOrder(props) {
    const dispatch = useDispatch();
    const history  = useHistory();
    const [ isShown, setIsShown ] = React.useState(false);
    const cartReducerData = useSelector(state => state.CartReducer);
    const orderSubmitIsLoading = cartReducerData.orderSubmitIsLoading;

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    const onEmptyCartClick = () => {
        dispatch(showConfirmDialog({
            title: <Translate value="cart:empty:action"/>,
            content: <Translate value="cart:empty:action:content"/>,
            onConfirm: () => {
                dispatch(emptyCart());
            },
        }));
    };

    const onSubmitOrderClick = () => {
        const shopUserIsNotAuthenticated = ! localStorage.getItem("shop_user_access_token");
        if (shopUserIsNotAuthenticated) {
            history.push('/login');
            dispatch(showSnackbar({ message: 'client:need_login', severity: 'error' }));
            return;
        }

        dispatch(showConfirmDialog({
            title: <Translate value="cart:order:submit"/>,
            content: <Translate value="cart:order:submit:content"/>,
            onConfirm: () => {
                dispatch(submitOrder({ ...cartReducerData, history, orderId: props.orderId }));
            },
        }));
    };

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' text-center bg-white mt-2 py-3 border_radius_15'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                {orderSubmitIsLoading ?
                    <Loader size={40} /> :
                    <div>
                        <Button variant="contained" color="secondary" className="mx-2 mb-2" onClick={onEmptyCartClick} >
                            <Translate value="cart:empty:action" />
                        </Button>
                        <Button variant="contained" color="primary" className="mx-2 mb-2 color_white" onClick={onSubmitOrderClick} >
                            <Translate value="cart:order:submit" />
                        </Button>
                    </div>
                }
            </div>
        </Collapse>
    );
}
