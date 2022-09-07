import React from 'react';
import { useSelector } from "react-redux";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import { BOX_SHADOW_CSS_RULE, SHOP_USER, } from "../../constants";
import Translate from "../common/Translate";
import OrderCount from "./OrderCount";
import CategoriesCount from "./CategoriesCount";
import ProductsCount from "./ProductsCount";
import OptionsCount from "./OptionsCount";
import OrderStatusCount from "./OrderStatusCount";
import OrderTypeCount from "./OrderTypeCount";
import OrderTransporterCount from "./OrderTransporterCount";
import OrderTimeChart from "./OrderTimeChart";
import CategoriesTimeChart from "./CategoriesTimeChart";


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
                {! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                    <OrderTimeChart report={report} />
                    <CategoriesTimeChart report={report} />
                </>}

                <OrderCount report={report} />

                {! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                    <CategoriesCount report={report} />
                </>}
                <OrderStatusCount report={report} />
                <OrderTypeCount report={report} />
                <OrderTransporterCount report={report} />

                {! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                    <ProductsCount report={report}/>
                    <OptionsCount report={report} />
                </>}
            </>}
        </div>
    );
};

