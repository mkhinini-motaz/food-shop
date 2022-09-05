import React from 'react';
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE } from "../../constants";

export default function OrderStatusCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
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
    );
};

