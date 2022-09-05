import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core';

import { getCurrentOrders } from "../../store/actions";
import { BASE_WS_URL, COMPONENT_SHOW_DELAY } from "../../constants";
import OrderOverview from "../../components/statistics/OrderOverview";
import Loader from '../../components/common/Loader';

import { formatDateTime } from "../../utils";

export default function Overview(props) {
    const dispatch = useDispatch();
    const socket = io(BASE_WS_URL, { transports : ['websocket'] });
    useEffect(() => {
        socket.on('order_update', (payload) => {
            dispatch(getCurrentOrders({}));
        });

        socket.emit('shop-user-connect', { shopId: 1 }); // TODO: add user_id and intercept from ws server
    }, [dispatch]);

    const [ orderDisplayDate, setOrderDisplayDate ] = React.useState(new Date());
    const [ isShown, setIsShown ] = React.useState(false);

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({ date_time: formatDateTime(orderDisplayDate.getTime() / 1000) })), [orderDisplayDate]);
    const currentOrdersReport     = useSelector(state => state.OrderReducer.currentOrdersReport);
    const currentOrdersAreLoading = useSelector(state => state.OrderReducer.currentOrdersAreLoading);

    if (currentOrdersAreLoading) {
         return <div className={"text-center"}><Loader size={200} /></div>;
    }

    return (
        <Collapse in={isShown}>
            <OrderOverview report={currentOrdersReport} displayDate={orderDisplayDate} onDisplayDateChange={setOrderDisplayDate} />
        </Collapse>
    );
}
