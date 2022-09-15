import React from 'react';
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderTransporterCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:transporters:title'}/>
                </Typography>
                {0 === report.transporters.length ? '' : <div>
                    {report.transporters.map(transporter =>
                        <div key={'order_transporter_' + transporter.id}>
                            <span>{transporter.first_name}</span>
                            <div className={"px-2"}>
                                <div>
                                    <Translate value={'order:count'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span className={"font-weight-bold"}>{transporter.orders_count}</span>
                                </div>
                                <div>
                                    <Translate value={'order:total_price'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span className={"font-weight-bold"}><MoneyFormatter value={transporter.orders_sum_total_price}/></span>
                                </div>
                                <div>
                                    <Translate value={'cart:delivery_fee:label'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span className={"font-weight-bold"}><MoneyFormatter value={transporter.orders_sum_delivery_fee}/></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

