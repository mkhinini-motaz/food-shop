import React from 'react';
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE } from "../../constants";

export default function OrderTransporterCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                {0 === report.transporters.length ? '' : <div>
                    <Translate value={'order:transporters'}/>
                    {report.transporters.map(transporter =>
                        <div key={'order_transporter_' + transporter.id}>
                            <span>{transporter.first_name}</span>
                            <div className={"px-2"}>
                                <div>
                                    <Translate value={'order:count'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span>{transporter.orders_count}</span>
                                </div>
                                <div>
                                    <Translate value={'order:total_price'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span><MoneyFormatter value={transporter.orders_sum_total_price}/></span>
                                </div>
                                <div>
                                    <Translate value={'cart:delivery_fee:label'}/>
                                    <span className={"mx-2"}>:</span>
                                    <span><MoneyFormatter value={transporter.orders_sum_delivery_fee}/></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

