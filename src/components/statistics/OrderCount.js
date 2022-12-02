import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import OrderCountDisplay from "./OrderCountDisplay";

export default function OrderCount(props) {
    const { count, countYesterday, countLastWeekSameDay, countLastMonthSameDay, countAvgThisWeek, countAvgLastWeek, countAvgThisMonth, countAvgLastMonth } = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 row mx-0"}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <OrderCountDisplay title={"common:today"} displayedCount={count.count} displayedPrice={count.total_price} />
                <OrderCountDisplay title={"common:yesterday"} displayedCount={countYesterday.count} displayedPrice={countYesterday.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:last_week"} displayedCount={countLastWeekSameDay.count} displayedPrice={countLastWeekSameDay.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:last_month"} displayedCount={countLastMonthSameDay.count} displayedPrice={countLastMonthSameDay.total_price} comparedCount={count.count} comparedPrice={count.total_price} />

                <OrderCountDisplay title={"order:report:avg_this_week"} displayedCount={countAvgThisWeek.count} displayedPrice={countAvgThisWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"order:report:avg_last_week"} displayedCount={countAvgLastWeek.count} displayedPrice={countAvgLastWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} />

                <OrderCountDisplay title={"order:report:avg_this_month"} displayedCount={countAvgThisMonth.count} displayedPrice={countAvgThisMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"order:report:avg_last_month"} displayedCount={countAvgLastMonth.count} displayedPrice={countAvgLastMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
            </div>
        </div>
    );
};

