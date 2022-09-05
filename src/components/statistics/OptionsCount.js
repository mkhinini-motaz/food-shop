import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";

export default function OptionsCount(props) {
    const report = props.report;

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                {report.options.map(option => <div key={"report_option_" + option.id}>
                    <TranslateField value={option.name}/>
                    <span className={"mx-2"}>:</span>
                    <div className={"px-3"}>
                        <span>{option.count}</span>
                        {! option.sum_price ? '' : <>
                            <span className={"mx-2"}>=</span>
                            <span><MoneyFormatter value={option.sum_price}/></span>
                        </>}
                    </div>
                </div>)}
            </div>
        </div>
    );
};

