import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import Translate from "../common/Translate";
import { useSelector } from "react-redux";

export default function ProductsCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:product_count:title'}/>
                </Typography>
                {report.products.map(product => <div key={"report_product_" + product.id}>
                    <TranslateField value={product.category.name}/>
                    <span className={"mx-2"}>-</span>
                    <TranslateField value={product.name}/>
                    <span className={"mx-2"}>:</span>
                    <div className={"px-3"}>
                        <span>{product.count}</span>
                        <span className={"mx-2"}>=</span>
                        <span className={"font-weight-bold"}><MoneyFormatter value={product.sum_price}/></span>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

