import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";

export default function CategoriesCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                {report.categories.map(category => <div key={"report_category_" + category.id}>
                    <TranslateField value={category.name}/>
                    <div className={"px-3"}>
                        <span className={"mx-2"}>:</span>
                        <span>{category.count}</span>
                        <span className={"mx-2"}>=</span>
                        <span><MoneyFormatter value={category.sum_price}/></span>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

