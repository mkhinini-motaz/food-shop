import React from 'react';
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { Divider, Typography } from "@material-ui/core";
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

                {0 === report.countStatus.length ? '' : <div>
                    <Divider className={"my-2"}/>
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

                {0 === report.countType.length ? '' : <div>
                    <Divider className={"my-2"}/>
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

                {0 === report.transporters.length ? '' : <div>
                    <Divider className={"my-2"}/>
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
                            </div>
                        </div>
                    )}
                </div>}

            </div>
        </div>
    );
};

