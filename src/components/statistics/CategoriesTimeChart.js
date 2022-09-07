import React, { useMemo } from 'react';
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY } from "../../constants";

import { Line } from 'react-chartjs-2';
import { translateFromObject } from "../../i18n";
import { useSelector } from "react-redux";


export default function CategoriesTimeChart(props) {
    const generateCategoryReport = (category, color) => ({
        name: category.name,
        id: category.id,
        data: [],
        label: translateFromObject(category.name, selectedLang, true),
        borderColor: color,
        backgroundColor: color + '66',
    });

    const report = props.report;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const categoriesSumPrice = {};
    const categoriesCount = {};
    for (let category of report.categoriesTime.categories) {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        categoriesSumPrice[category.id] = generateCategoryReport(category, color);
        categoriesCount[category.id] = generateCategoryReport(category, color);
    }

    const labels = {};
    for (let categoryData of report.categoriesTime.report) {
        let categorySumPrice = categoriesSumPrice[categoryData.id];
        let categoryCount = categoriesCount[categoryData.id];

console.log({sumPrice: categoryData.sum_price, count: categoryData.count, name: translateFromObject(categorySumPrice.name, selectedLang, true)})
        categorySumPrice.data.push(categoryData.sum_price);
        categoryCount.data.push(categoryData.count);

        labels[categoryData.date] = true;
    }
console.log({labels: Object.keys(labels), categoriesSumPrice, categoriesCount, report: report.categoriesTime.report})
    const dataTotalPrice = {
        labels: Object.keys(labels),
        datasets: Object.values(categoriesSumPrice),
    };

    const dataCount = {
        labels: Object.keys(labels),
        datasets: Object.values(categoriesCount),
    };

    const optionsTotalPrice = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Categories total price', // TODO: translate

            },
        },
        scales: {
            yAxis: {
                beginAtZero: true,
            }
        }
    };
    const optionsCount = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Categories count', // TODO: translate

            },
        },
        scales: {
            yAxis: {
                beginAtZero: true,
            }
        }
    };

    return (
        <>
            <div className={"p-2 col-12"}>
                <div className={"bg-white p-2 border_radius_15 "}
                     style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                >
                    <Line options={optionsTotalPrice} data={dataTotalPrice} height={300} />
                </div>
            </div>

            <div className={"p-2 col-12"}>
                <div className={"bg-white p-2 border_radius_15 "}
                     style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                >
                    <Line options={optionsCount} data={dataCount} height={300} />
                </div>
            </div>
        </>
    );
};

