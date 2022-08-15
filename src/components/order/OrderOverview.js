import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { BOX_SHADOW_CSS_RULE, SHOP_USER } from "../../constants";
import Translate from "../common/Translate";
import { useSelector } from "react-redux";

export default function OrderOverview(props) {
    const authShopUser = useSelector(state => state.AuthReducer.authShopUser);

    const { orders, displayDate, onDisplayDateChange } = props;

// TODO: statistics from server
    return (
        <div className={"bg-white my-2 p-2 border_radius_15 w-100 "}
             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
        >
            {! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                <div>
                    <Translate value={'order:count'}/>
                    <span className={"mx-2"}>:</span>
                    <span>{orders?.length || 0}</span>
                </div>
            </>}
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
    );
};

