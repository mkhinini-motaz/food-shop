import React from 'react';
import Translate from "../common/Translate";
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import MoneyFormatter from "../common/MoneyFormatter";

export default function OrderTypeCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                {0 === report.countType.length ? '' : <div>
                    <Translate value={'order:type'}/>
                    {report.countType.map(type =>
                        <div key={'order_type_' + type.type}>
                            <span>{type.count}</span>
                            <span className={"mx-2"}>-</span>
                            <Translate value={TYPES[type.type]}/>
                            <span className={"mx-2"}>:</span>
                            <span><MoneyFormatter value={type.total_price}/></span>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

