import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import Translate from "../common/Translate";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function OrderCountDisplay(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'd-flex flex-wrap ' + (selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ');
    const { title, displayedCount, displayedPrice, comparedCount, comparedPrice, displayedAvg, comparedAvg } = props;

    const getTrendingIcon = (firstValue, secondValue) => {
        if (firstValue === secondValue) {
            return '';
        }

        const first = firstValue != null ? parseInt(firstValue) : 0;
        const second = secondValue != null ? parseInt(secondValue) : 0;
        return <span className={'m' + (selectedLangWriteFrom === 'left' ? 'l' : 'r') + '-2'}>
            {first > second ?
                <TrendingUpIcon style={{ color: "#28a745", transform: selectedLangWriteFrom === 'left' ? '' : 'scaleX(-1)' }} /> :
                <TrendingDownIcon style={{ color: "#dc3545", transform: selectedLangWriteFrom === 'left' ? '' : 'scaleX(-1)' }} />
            }
        </span>;
    };

    return (
        <div className={"col-6 px-2"}>
            <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                <Translate value={title} textOnly={true} />
            </Typography>
            <div className={flexRowClassName}>
                <Translate value={'order:count'}/>
                <span className={"mx-2"}>:</span>
                <span className={"font-weight-bold"}>{displayedCount}</span>

                {! comparedCount ? '' : getTrendingIcon(comparedCount, displayedCount)}
            </div>
            <div className={flexRowClassName}>
                <Translate value={'order:total_price'}/>
                <span className={"mx-2"}>:</span>
                <span className={"font-weight-bold"}><MoneyFormatter value={displayedPrice} /></span>
                {! comparedPrice ? '' : getTrendingIcon(comparedPrice, displayedPrice)}
            </div>
            <div className={flexRowClassName}>
                <Translate value={'order:avg_total_price'}/>
                <span className={"mx-2"}>:</span>
                <span className={"font-weight-bold"}><MoneyFormatter value={Math.round(displayedAvg / 1000) * 1000} /></span>
                {! comparedAvg ? '' : getTrendingIcon(comparedAvg, displayedAvg)}
            </div>
        </div>
    );
};

