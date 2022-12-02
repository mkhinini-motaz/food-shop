import React from 'react';
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";

import { Line } from 'react-chartjs-2';
import { translate } from "../../i18n";
import { useSelector } from "react-redux";
import Translate from "../common/Translate";

export default function OrderHoursChart(props) {
    const report = props.report;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);

    const ordersData = [];
    const labels = [];
    for (let order of report.ordersHours) {
        ordersData.push(order.count);
        labels.push(order.hour);
    }

    const ordersYesterdayData = [];
    for (let order of report.ordersYesterdayHours) {
        ordersYesterdayData.push(order.count);
    }

    const ordersLastWeekSameDayData = [];
    for (let order of report.ordersLastWeekSameDayHours) {
        ordersLastWeekSameDayData.push(order.count);
    }

    const data = {
        labels,
        datasets: [
            {
                label: translate('common:today', selectedLang, true),
                data: ordersData,
                borderColor: COLOR_PRIMARY,
                backgroundColor: COLOR_PRIMARY + '66',
            },
            {
                label: translate('common:yesterday', selectedLang, true),
                data: ordersYesterdayData,
                borderColor: COLOR_SECONDARY + '55',
                backgroundColor: COLOR_SECONDARY + '77',
            },
            {
                label: translate('common:last_week', selectedLang, true),
                data: ordersLastWeekSameDayData,
                borderColor: '#36454f55',
                backgroundColor: '#36454f77',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
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
                suggestedMax: 16,
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

