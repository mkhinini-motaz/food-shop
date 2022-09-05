import React from 'react';
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderCount(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:today" textOnly={true} />
                    </Typography>
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
                </div>

                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:yesterday" textOnly={true} />
                    </Typography>
                    <div>
                        <Translate value={'order:count'}/>
                        <span className={"mx-2"}>:</span>
                        <span>{report.countYesterday.count}</span>
                    </div>
                    <div>
                        <Translate value={'order:total_price'}/>
                        <span className={"mx-2"}>:</span>
                        <span><MoneyFormatter value={report.countYesterday.total_price}/></span>
                    </div>
                </div>

                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:last_week" textOnly={true} />
                    </Typography>
                    <div>
                        <Translate value={'order:count'}/>
                        <span className={"mx-2"}>:</span>
                        <span>{report.countLastWeekSameDay.count}</span>
                    </div>
                    <div>
                        <Translate value={'order:total_price'}/>
                        <span className={"mx-2"}>:</span>
                        <span><MoneyFormatter value={report.countLastWeekSameDay.total_price}/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

