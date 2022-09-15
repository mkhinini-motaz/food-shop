import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import OrderCountDisplay from "./OrderCountDisplay";

export default function OrderCount(props) {
    const { count, countYesterday, countLastWeekSameDay, countAvgThisWeek, countAvgLastWeek, countAvgThisMonth, countAvgLastMonth } = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <OrderCountDisplay title={"common:today"} displayedCount={count.count} displayedPrice={count.total_price} />
                <OrderCountDisplay title={"common:yesterday"} displayedCount={countYesterday.count} displayedPrice={countYesterday.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:last_week"} displayedCount={countLastWeekSameDay.count} displayedPrice={countLastWeekSameDay.total_price} comparedCount={count.count} comparedPrice={count.total_price} />

                <OrderCountDisplay title={"common:avg_this_week"} displayedCount={countAvgThisWeek.count} displayedPrice={countAvgThisWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:avg_last_week"} displayedCount={countAvgLastWeek.count} displayedPrice={countAvgLastWeek.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:avg_this_week"} displayedCount={countAvgThisMonth.count} displayedPrice={countAvgThisMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
                <OrderCountDisplay title={"common:avg_last_week"} displayedCount={countAvgLastMonth.count} displayedPrice={countAvgLastMonth.total_price} comparedCount={count.count} comparedPrice={count.total_price} />
            </div>
        </div>
    );
};

