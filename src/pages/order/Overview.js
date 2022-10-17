import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from '@material-ui/core';

import { getReport } from "../../store/actions";
import { COMPONENT_SHOW_DELAY } from "../../constants";
import OrderOverview from "../../components/statistics/OrderOverview";

import { formatDateTime } from "../../utils";

export default function Overview(props) {
    const dispatch = useDispatch();

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
