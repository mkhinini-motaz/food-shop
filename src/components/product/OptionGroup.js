import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import Option from "../cart/Option";
import TranslateField from "../common/TranslateField";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COMPONENT_SHOW_DELAY } from "../../constants";

export default function OptionGroup(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const optionsOutput = [];
    const optionsSelectedByDefault = [];
    let showDelay = props.showDelay;
    for (let option of props.optionGroup.options) {
        optionsOutput.push(<Option
            onChange={(isSelected) => props.onChange(option, isSelected)}
            onQuantityChange={(quantity) => props.onQuantityChange(option, quantity)}
            showDelay={showDelay}
            option={option}
            isSelected={!! props.defaultChoices.filter(element => element.id === option.id).length}
            isQuantifiable={!! props.optionGroup.options_are_quantifiable}
            key={'option_' + option.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;

        if (option.is_selected_by_default) {
            optionsSelectedByDefault.push(option);
        }
    }

    useEffect(() => {
        optionsSelectedByDefault.forEach(option => props.onChange(option, true));
    }, []);

    return (
        <div className="my-3"
             style={{
                 backgroundColor: '#f5f6f6',
                 borderRadius: '15px',
                 boxShadow: (selectedLangWriteFrom === 'right' ? '-' : '') + BOX_SHADOW_CSS_RULE,
             }}
        >
            <div className="text-center"
                 style={{
                     backgroundColor: COLOR_PRIMARY + 'cc',
                     borderTopRightRadius: '15px',
                     borderTopLeftRadius: '15px',
                 }} >
                <Typography variant="h5" component="h3" color="secondary">
                    <TranslateField value={props.optionGroup.name} />
                </Typography>
            </div>
            <div className="mt-3 pb-1">
                {optionsOutput}
            </div>
        </div>
        );
}
