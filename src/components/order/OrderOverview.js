import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import { BOX_SHADOW_CSS_RULE, SHOP_USER } from "../../constants";
import Translate from "../common/Translate";
import { useSelector } from "react-redux";
import MoneyFormatter from "../common/MoneyFormatter";
import TranslateField from "../common/TranslateField";

export default function OrderOverview(props) {
    const authShopUser = useSelector(state => state.AuthReducer.authShopUser);

    const { report, displayDate, onDisplayDateChange } = props;

// TODO: statistics from server
    return (
        <div className={"row"}>
            <div className={"p-2 col-12 col-sm-4"}>
                <div className={"bg-white p-2 border_radius_15 "}
                     style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                >
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

            {! report.count ? '' :
                <div className={"p-2 col-12 col-sm-4"}>
                    <div className={"bg-white p-2 border_radius_15 "}
                         style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                    >
                        <div>
                            <Translate value={'order:count'}/>
                            <span className={"mx-2"}>:</span>
                            <span>{report.count.count}</span>
                        </div>
                        <div>
                            <Translate value={'order:total_price'}/>
                            <span className={"mx-2"}>:</span>
                            <span><MoneyFormatter value={report.count.total_price}/></span>
                        </div>
                        {0 === report.countStatus.length ? '' : <div>
                            <Translate value={'order:status'}/>
                            {report.countStatus.map(status =>
                                <div key={'order_status_' + status.status}>
                                    <span>{status.count}</span>
                                    <span className={"mx-2"}>-</span>
                                    <Translate value={'order:status:' + status.status}/>
                                    <span className={"mx-2"}>:</span>
                                    <span><MoneyFormatter value={status.total_price}/></span>
                                </div>
                            )}
                        </div>}
                    </div>
                </div>
            }

            {! report.count || ! SHOP_USER.CAN_SEE_ORDERS_STATISTICS.includes(authShopUser.role) ? '' : <>
                <div className={"p-2 col-12 col-sm-4"}>
                    <div className={"bg-white p-2 border_radius_15 "}
                         style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                    >
                        {report.categories.map(category => <div key={"report_category_" + category.id}>
                            <TranslateField value={category.name}/>
                            <div className={"px-3"}>
                                <span className={"mx-2"}>:</span>
                                <span>{category.count}</span>
                                <span className={"mx-2"}>=</span>
                                <span><MoneyFormatter value={category.sum_price}/></span>
                            </div>
                        </div>)}
                    </div>
                </div>

                <div className={"p-2 col-12 col-sm-4"}>
                    <div className={"bg-white p-2 border_radius_15 "}
                         style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                    >
                        {report.products.map(product => <div key={"report_product_" + product.id}>
                            <TranslateField value={product.category.name}/>
                            <span className={"mx-2"}>-</span>
                            <TranslateField value={product.name}/>
                            <span className={"mx-2"}>:</span>
                            <div className={"px-3"}>
                                <span>{product.count}</span>
                                <span className={"mx-2"}>=</span>
                                <span><MoneyFormatter value={product.sum_price}/></span>
                            </div>
                        </div>)}
                    </div>
                </div>

                <div className={"p-2 col-12 col-sm-4"}>
                    <div className={"bg-white p-2 border_radius_15 "}
                         style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                    >
                        {report.options.map(option => <div key={"report_option_" + option.id}>
                            <TranslateField value={option.name}/>
                            <span className={"mx-2"}>:</span>
                            <div className={"px-3"}>
                                <span>{option.count}</span>
                                {! option.sum_price ? '' : <>
                                    <span className={"mx-2"}>=</span>
                                    <span><MoneyFormatter value={option.sum_price}/></span>
                                </>}
                            </div>
                        </div>)}
                    </div>
                </div>
            </>}
        </div>
    );
};

