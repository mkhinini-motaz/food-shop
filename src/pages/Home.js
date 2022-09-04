import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import Order from "../components/order/Order";
import { getCurrentOrders } from "../store/actions";
import { BASE_WS_URL, BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COMPONENT_SHOW_DELAY } from "../constants";
import Loader from '../components/common/Loader';

import { formatDateTime } from "../utils";
import Translate from "../components/common/Translate";

export default function Home(props) {
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
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({ date_time: formatDateTime(orderDisplayDate.getTime() / 1000) })), [orderDisplayDate]);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders);
    const currentOrdersReport = useSelector(state => state.OrderReducer.currentOrdersReport);
    const currentOrdersAreLoading = useSelector(state => state.OrderReducer.currentOrdersAreLoading);
    let loaderComponent = '';

    if (currentOrdersAreLoading) {
        loaderComponent = <div className={"text-center position-absolute"}
                               style={{
                                   backgroundColor: COLOR_PRIMARY + '66',
                                   top: 0,
                                   left: '-15px',
                                   width: '100vw',
                                   height: '100vh',
                                   zIndex: 5,
                               }} >
            <Loader size={200} />
        </div>;
    }

    let ordersOutput;
    if (! currentOrdersAreLoading && (! currentOrders || 0 === currentOrders.length)) {
        ordersOutput = <Translate value={"order:no_orders"}/>;
    } else {
        ordersOutput = currentOrders.map((order, index) =>
            <Order key={'order_card_' + order.id} order={order} index={index} showTotal />
        );
    }

    return (
        <Collapse in={isShown}>
            <div className={"position-relative"}>
                <div className={"p-2 col-12 col-sm-4"}>
                    {loaderComponent}
                    <div className={"bg-white p-2 border_radius_15 "}
                         style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                format="dd/MM/yyyy"
                                label={<Translate value={"common:date"}/>}
                                value={orderDisplayDate}
                                onChange={setOrderDisplayDate}
                                disableFuture
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className={"m-2 text-center d-flex flex-wrap " + flexRowClassName} >
                        {ordersOutput}
                    </div>
                </div>
            </div>
        </Collapse>
    );
}
