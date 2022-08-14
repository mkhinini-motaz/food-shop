import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core';

import Order from "../components/order/Order";
import { getCurrentOrders } from "../store/actions";
import { BASE_WS_URL, COMPONENT_SHOW_DELAY } from "../constants";

export default function Home(props) {
    const dispatch = useDispatch();
    const socket = io(BASE_WS_URL, { transports : ['websocket'] });
    useEffect(() => {
        socket.on('order_update', (payload) => {
            dispatch(getCurrentOrders({}));
        });

        socket.emit('shop-user-connect', { shopId: 1 }); // TODO: add user_id and intercept from ws server
    }, [dispatch]);

    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({})), []);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders.data);

    return (
        <Collapse in={isShown}>
            <div className="row">
                <div className={"m-2 text-center d-flex justify-content-center flex-wrap " + flexRowClassName} >
                    {currentOrders.map((order, index) => <Order key={'order_card_' + order.id} order={order} index={index} showTotal />)}
                </div>
            </div>
        </Collapse>
    );
}
