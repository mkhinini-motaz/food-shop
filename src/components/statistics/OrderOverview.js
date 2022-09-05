import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { Divider } from "@material-ui/core";

import { BOX_SHADOW_CSS_RULE, SHOP_USER, TYPES } from "../../constants";
import Translate from "../common/Translate";
import { useSelector } from "react-redux";
import MoneyFormatter from "../common/MoneyFormatter";
import TranslateField from "../common/TranslateField";
import OrderCount from "./OrderCount";
import CategoriesCount from "./CategoriesCount";
import ProductsCount from "./ProductsCount";
import OptionsCount from "./OptionsCount";
import OrderStatusCount from "./OrderStatusCount";
import OrderTypeCount from "./OrderTypeCount";
import OrderTransporterCount from "./OrderTransporterCount";

export default function OrderOverview(props) {
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
                <OrderCount report={report} />
                <OrderStatusCount report={report} />
                <OrderTypeCount report={report} />
                <OrderTransporterCount report={report} />
            </>}

            {! report.count || ! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                <CategoriesCount report={report} />
                <ProductsCount report={report}/>
                <OptionsCount report={report} />
            </>}
        </div>
    );
};

