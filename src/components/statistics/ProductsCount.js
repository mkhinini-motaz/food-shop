import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";

export default function ProductsCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                {report.products.map(product => <div key={"report_product_" + product.id}>
                    <TranslateField value={product.category.name}/>
                    <span className={"mx-2"}>-</span>
                    <TranslateField value={product.name}/>
                    <span className={"mx-2"}>:</span>
                    <div className={"px-3"}>
                        <span>{product.count}</span>
                        <span className={"mx-2"}>=</span>
                        <span><MoneyFormatter value={product.sum_price}/></span>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

