import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core';

import { getCurrentOrders, getReport } from "../../store/actions";
import { BASE_WS_URL, COMPONENT_SHOW_DELAY } from "../../constants";
import OrderOverview from "../../components/statistics/OrderOverview";

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

    const currentOrdersReport = useSelector(state => state.OrderReducer.report);
    const [ orderDisplayDate, setOrderDisplayDate ] = React.useState(new Date());
    const [ isShown, setIsShown ] = React.useState(false);

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getReport({ date_time: formatDateTime(orderDisplayDate.getTime() / 1000) })), [orderDisplayDate]);

    return (
        <Collapse in={isShown}>
            <OrderOverview report={currentOrdersReport} displayDate={orderDisplayDate} onDisplayDateChange={setOrderDisplayDate} />
        </Collapse>
    );
}
