import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Collapse } from '@material-ui/core'
import GoogleMap from '../../components/common/GoogleMap';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import { getCurrentOrders } from "../../store/actions";
import { BASE_WS_URL, BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from "../../constants";

import { formatDateTime } from "../../utils";
import Translate from "../../components/common/Translate";

export default function Map(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io(BASE_WS_URL, { transports : ['websocket'] });
        socket.on('order_update', (payload) => {
            dispatch(getCurrentOrders({}));
        });

        socket.emit('shop-user-login', { authToken: localStorage.getItem('shop_user_access_token') });

        return () => {
            socket.disconnect();
        }
    }, [dispatch]);

    const [ orderDisplayDate, setOrderDisplayDate ] = React.useState(new Date());
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({ date_time: formatDateTime(orderDisplayDate.getTime() / 1000) })), [orderDisplayDate]);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders);
    const currentOrdersAreLoading = useSelector(state => state.OrderReducer.currentOrdersAreLoading);

    let ordersOutput;
    if (! currentOrdersAreLoading && (! currentOrders || 0 === currentOrders.length)) {
        ordersOutput = <Translate value={"order:no_orders"}/>;
    } else {
        ordersOutput = <GoogleMap orders={currentOrders} height={"80vh"} width={"100%"} />
    }

    return (
        <Collapse in={isShown}>
            <div className={"position-relative"}>
                <div className={"p-2 col-12"}>
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
                    <div className={"px-4 py-2 col-12"}>
                        <div className={"bg-white border_radius_15 orders_map_output"}
                             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                        >
                            {ordersOutput}
                        </div>
                    </div>
                </div>
            </div>
        </Collapse>
    );
}
