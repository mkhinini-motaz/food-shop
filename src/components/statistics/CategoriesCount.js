import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";
import { translate, translateFromObject } from "../../i18n";
import { useSelector } from "react-redux";
import Translate from "../common/Translate";
import { Typography } from "@material-ui/core";


export default function CategoriesCount(props) {
    const report = props.report;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    if (! report.categories || 0 === report.categories.length) {
        return <div></div>;
    }

    const countLabels         = [];
    const sumPriceLabels      = [];
    const categoriesCountData = [];
    const categoriesPriceData = [];
    for (let category of report.categories) {
        const categoryName = translateFromObject(category.name, selectedLang, true);
        categoriesCountData.push(category.count);
        categoriesPriceData.push(category.sum_price / 1000);
        if (selectedLangWriteFrom === 'right') {
            countLabels.push('(' + category.count + ') ' + categoryName);
            sumPriceLabels.push('(' + (category.sum_price / 1000) + ') ' + categoryName);
        } else {
            countLabels.push(categoryName + ' (' + category.count + ')');
            sumPriceLabels.push(categoryName + ' (' + (category.sum_price / 1000) + ')');
        }
    }

    const dataCount = {
        labels: countLabels,
        datasets: [
            {
                label: translate('order:report:category_count:title', selectedLang, true),
                data: categoriesCountData,
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataPrice = {
        labels: sumPriceLabels,
        datasets: [
            {
                label: translate('order:report:category_count:title', selectedLang, true),
                data: categoriesPriceData,
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <div className={"p-2 col-12 col-sm-4"}>
                <div className={"bg-white p-2 border_radius_15 mx-0 "}
                     style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                >
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="order:report:category_count:title" textOnly={true} />
                    </Typography>
                    <div>
                        <Pie data={dataCount} redraw />
                    </div>
                </div>
            </div>
            <div className={"p-2 col-12 col-sm-4"}>
                <div className={"bg-white p-2 border_radius_15 mx-0 "}
                     style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                >
                    <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                        <Translate value="order:report:category_price:title" textOnly={true} />
                    </Typography>
                    <div>
                        <Pie data={dataPrice} redraw />
                    </div>
                </div>
            </div>
        </>
    );
};

