import React from 'react';
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderStatusCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:status:title'}/>
                </Typography>
                {0 === report.countStatus.length ? '' : <div>
                    {report.countStatus.map(status =>
                        <div key={'order_status_' + status.status}>
                            <span>{status.count}</span>
                            <span className={"mx-2"}>-</span>
                            <Translate value={'order:status:' + status.status}/>
                            <span className={"mx-2"}>:</span>
                            <span className={"font-weight-bold"}><MoneyFormatter value={status.total_price}/></span>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

