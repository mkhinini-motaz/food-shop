import React from 'react';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import TranslateField from "../common/TranslateField";
import MoneyFormatter from "../common/MoneyFormatter";
import { Typography } from "@material-ui/core";
import Translate from "../common/Translate";
import { useSelector } from "react-redux";

export default function IngredientsCount(props) {
    const report = props.report;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const filterFunc = (doseUnit) => (ingredient) => ingredient.dose_unit === doseUnit;
    const renderIngredient = ingredient => <div key={"report_ingredient_" + ingredient.name}>
        <TranslateField value={JSON.parse(ingredient.name)}/>
        <span className={"mx-2"}>:</span>
        <span className={"mx-2 font-weight-bold"}>{ingredient.dose_sum}</span>
        <span><Translate value={'ingredient:' + ingredient.dose_unit + (ingredient.dose_sum > 1 ? 's' : '')} /></span>
    </div>
    return (
        <div className={"p-2 col-12 col-sm-4"}>
            <div className={"bg-white p-2 border_radius_15 "}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="h6" component="h6" color="primary" align={selectedLangWriteFrom}>
                    <Translate value={'order:report:ingredient_count:title'}/>
                </Typography>
                <div className={"row"}>
                    <div className={"col-6"}>{report.ingredients.filter(filterFunc('piece')).map(renderIngredient)}</div>
                    <div className={"col-6"}>{report.ingredients.filter(filterFunc('gr')).map(renderIngredient)}</div>
                    <div className={"col-6"}>{report.ingredients.filter(filterFunc('ml')).map(renderIngredient)}</div>
                </div>
            </div>
        </div>
    );
};

