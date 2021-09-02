import React from 'react';
import { Typography } from "@material-ui/core";

import Option from "./Option";
import TranslateField from "../common/TranslateField";
import { COMPONENT_SHOW_DELAY } from "../../constants";

export default function OptionGroup(props) {
    const options = [];
    let showDelay = props.showDelay;
    for (let option of props.optionGroup.options) {
        options.push(<Option
            onChange={(isSelected) => props.onChange(option, isSelected)}
            onQuantityChange={(quantity) => props.onQuantityChange(option, quantity)}
            showDelay={showDelay}
            option={option}
            isSelected={!! props.defaultChoices.filter(element => element.id === option.id).length}
            isQuantifiable={!! props.optionGroup.pivot.options_are_quantifiable}
            key={'option_' + option.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div className="p-2 my-2" style={{ backgroundColor: '#f5f6f6', borderRadius: '15px', }}>
            <div className="w-100 text-center">
                <Typography variant="h6" component="h4" color="primary">
                    <TranslateField value={props.optionGroup.name} />
                </Typography>
            </div>
            <div>
                {options}
            </div>
        </div>
        );
}
