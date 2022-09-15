import React from 'react';
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";

import { Line } from 'react-chartjs-2';
import { translate } from "../../i18n";
import { useSelector } from "react-redux";

export default function OrderHoursChart(props) {
    const report = props.report;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);

    const ordersData = [];
    const labels = [];
    for (let order of report.ordersHours) {
        ordersData.push(order.count);
        labels.push(order.hour);
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
                text: translate('order:report:hour:title', selectedLang, true)
            },
        },
        scales: {
            yAxis: {
                beginAtZero: true,
                suggestedMax: 20,
            }
        }
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

