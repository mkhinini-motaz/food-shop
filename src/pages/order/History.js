import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core';

import { getCurrentOrders, getReport } from "../../store/actions";
import { BASE_WS_URL, COMPONENT_SHOW_DELAY } from "../../constants";
import OrderHistory from "../../components/statistics/OrderHistory";

import { formatDateTime } from "../../utils";

export default function History(props) {
    const dispatch = useDispatch();
    const currentOrdersReport = useSelector(state => state.OrderReducer.report);
    const [ orderDisplayDate, setOrderDisplayDate ] = React.useState(new Date());
    const [ isShown, setIsShown ] = React.useState(false);

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getReport({ date_time: formatDateTime(orderDisplayDate.getTime() / 1000) })), [orderDisplayDate]);

    return (
        <Collapse in={isShown}>
            <OrderHistory report={currentOrdersReport} displayDate={orderDisplayDate} onDisplayDateChange={setOrderDisplayDate} />
        </Collapse>
    );
}
