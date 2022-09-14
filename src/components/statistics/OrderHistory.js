import React from 'react';
import { useSelector } from "react-redux";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import { BOX_SHADOW_CSS_RULE, SHOP_USER, } from "../../constants";
import Translate from "../common/Translate";
import OrderTimeChart from "./OrderTimeChart";
import CategoriesTimeChart from "./CategoriesTimeChart";

export default function OrderHistory(props) {
    const authShopUser = useSelector(state => state.AuthReducer.authShopUser);

    const { report, displayDate, onDisplayDateChange } = props;

// TODO: statistics from server
    return (
        <div className={"row"}>
            <div className={"p-2 col-12"}>
                <div className={"bg-white p-2 border_radius_15 "} style={{ boxShadow: BOX_SHADOW_CSS_RULE }} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            format="dd/MM/yyyy"
                            label={<Translate value={"common:date"}/>}
                            value={displayDate}
                            onChange={onDisplayDateChange}
                            disableFuture
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>

            {! report.count ? '' : <>
                {! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                    <OrderTimeChart report={report} />
                    <CategoriesTimeChart report={report} />
                </>}
            </>}
        </div>
    );
};

