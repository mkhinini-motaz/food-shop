import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Translate from "../common/Translate";

export default function OptionsCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:options_count:title'}/>
                </Typography>
                {report.options.map(option => <div key={"report_option_" + option.id}>
                    <TranslateField value={option.name}/>
                    <span className={"mx-2"}>:</span>
                    <div className={"px-3"}>
                        <span>{option.count}</span>
                        {! option.sum_price ? '' : <>
                            <span className={"mx-2"}>=</span>
                            <span className={"font-weight-bold"}><MoneyFormatter value={option.sum_price}/></span>
                        </>}
                    </div>
                </div>)}
            </div>
        </div>
    );
};

