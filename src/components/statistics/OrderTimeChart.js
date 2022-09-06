import React, { useMemo } from 'react';
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";

import { Line } from 'react-chartjs-2';


export default function OrderTimeChart(props) {
    const report = props.report;

    const ordersData = [];
    const labels = [];
    for (let order of report.ordersTime) {
        ordersData.push(order.total_price);
        labels.push(order.date);
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Orders', // TODO: translate
                data: ordersData,
                borderColor: COLOR_PRIMARY,
                backgroundColor: COLOR_PRIMARY + '66',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Last 3 months', // TODO: translate

            },
        },
    };

    return (
        <div className={"p-2 col-12"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Line options={options} data={data} height={300} />
            </div>
        </div>
    );
};

