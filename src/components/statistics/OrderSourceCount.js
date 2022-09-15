import React from 'react';
import Translate from "../common/Translate";
import { BOX_SHADOW_CSS_RULE, SOURCES } from "../../constants";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderSourceCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:source:title'}/>
                </Typography>
                {0 === report.countSource.length ? '' : <div>
                    {report.countSource.map(source =>
                        <div key={'order_source_' + source.source}>
                            <span>{source.count}</span>
                            <span className={"mx-2"}>-</span>
                            <Translate value={SOURCES[source.source]}/>
                            <span className={"mx-2"}>:</span>
                            <span className={"font-weight-bold"}><MoneyFormatter value={source.total_price}/></span>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

