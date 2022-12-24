import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import OrderCountDisplay from "./OrderCountDisplay";
import { useSelector } from "react-redux";

export default function OrderCount(props) {
    const { count, countYesterday, countLastWeekSameDay, countLastMonthSameDay, countAvgThisWeek, countAvgLastWeek, countAvgThisMonth, countAvgLastMonth } = props.report;

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = (selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : ' ');

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 row mx-0 " + flexRowClassName}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <OrderCountDisplay title={"common:today"} displayedCount={count.count} displayedPrice={count.total_price} displayedAvg={count.avg_total_price} />
                <OrderCountDisplay title={"common:yesterday"} displayedCount={countYesterday.count} displayedPrice={countYesterday.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countYesterday.avg_total_price} comparedAvg={count.avg_total_price} />
                <OrderCountDisplay title={"common:last_week"} displayedCount={countLastWeekSameDay.count} displayedPrice={countLastWeekSameDay.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countLastWeekSameDay.avg_total_price} comparedAvg={count.avg_total_price} />
                <OrderCountDisplay title={"common:last_month"} displayedCount={countLastMonthSameDay.count} displayedPrice={countLastMonthSameDay.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countLastMonthSameDay.avg_total_price} comparedAvg={count.avg_total_price} />

                <OrderCountDisplay title={"order:report:avg_this_week"} displayedCount={countAvgThisWeek.count} displayedPrice={countAvgThisWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countAvgThisWeek.avg_total_price} comparedAvg={count.avg_total_price} />
                <OrderCountDisplay title={"order:report:avg_last_week"} displayedCount={countAvgLastWeek.count} displayedPrice={countAvgLastWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countAvgLastWeek.avg_total_price} comparedAvg={count.avg_total_price} />

                <OrderCountDisplay title={"order:report:avg_this_month"} displayedCount={countAvgThisMonth.count} displayedPrice={countAvgThisMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countAvgThisMonth.avg_total_price} comparedAvg={count.avg_total_price} />
                <OrderCountDisplay title={"order:report:avg_last_month"} displayedCount={countAvgLastMonth.count} displayedPrice={countAvgLastMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} displayedAvg={countAvgLastMonth.avg_total_price} comparedAvg={count.avg_total_price} />
            </div>
        </div>
    );
};

