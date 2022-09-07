import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderCount(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'd-flex ' + (selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ');
    const { count, countYesterday, countLastWeekSameDay } = props.report;

    const getTrendingIcon = (firstValue, secondValue) => {
        if (firstValue === secondValue) {
            return '';
        }

        return <span className={'m' + (selectedLangWriteFrom === 'left' ? 'l' : 'r') + '-2'}>
            {parseInt(firstValue) > parseInt(secondValue) ?
                <TrendingUpIcon style={{ color: "#28a745", transform: selectedLangWriteFrom === 'left' ? '' : 'scaleX(-1)' }} /> :
                <TrendingDownIcon style={{ color: "#dc3545", transform: selectedLangWriteFrom === 'left' ? '' : 'scaleX(-1)' }} />
            }
        </span>;
    };

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:today" textOnly={true} />
                    </Typography>
                    <div className={flexRowClassName}>
                        <Translate value={'order:count'}/>
                        <span className={"mx-2"}>:</span>
                        <span>{count.count}</span>
                    </div>
                    <div className={flexRowClassName}>
                        <Translate value={'order:total_price'}/>
                        <span className={"mx-2"}>:</span>
                        <span><MoneyFormatter value={count.total_price}/></span>
                    </div>
                </div>

                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:yesterday" textOnly={true} />
                    </Typography>
                    <div className={flexRowClassName}>
                        <Translate value={'order:count'}/>
                        <span className={"mx-2"}>:</span>
                        <span>{countYesterday.count}</span>
                        {getTrendingIcon(count.count, countYesterday.count)}
                    </div>
                    <div className={flexRowClassName}>
                        <Translate value={'order:total_price'}/>
                        <span className={"mx-2"}>:</span>
                        <MoneyFormatter value={countYesterday.total_price} />
                        {getTrendingIcon(count.total_price, countYesterday.total_price)}
                    </div>
                </div>

                <div>
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="common:last_week" textOnly={true} />
                    </Typography>
                    <div className={flexRowClassName}>
                        <Translate value={'order:count'}/>
                        <span className={"mx-2"}>:</span>
                        <span>{countLastWeekSameDay.count}</span>
                        {getTrendingIcon(count.count, countLastWeekSameDay.count)}
                    </div>
                    <div className={flexRowClassName}>
                        <Translate value={'order:total_price'}/>
                        <span className={"mx-2"}>:</span>
                        <span><MoneyFormatter value={countLastWeekSameDay.total_price}/></span>
                        {getTrendingIcon(count.total_price, countLastWeekSameDay.total_price)}
                    </div>
                </div>
            </div>
        </div>
    );
};

