import React, { useState } from 'react';

import OptionGroup from './OptionGroup';
import { COMPONENT_SHOW_DELAY, OPTION } from "../../constants";

export default function OptionGroups(props) {
    const [ options, setOptions ] = useState([]);
    const optionsComponents = [];
    let showDelay = 0;

    for (let optionGroup of props.optionGroups || []) {
        optionsComponents.push(<OptionGroup
            optionGroup={optionGroup}
            showDelay={showDelay}
            onQuantityChange={(option, quantity) => {
                let newoptions = options;
                newoptions.forEach(element => {
                    if (element.id === option.id) {
                        element.quantity = quantity;
                    }
                });
                setOptions(newoptions);
            }}
            onChange={(option, isSelected) => {
                if (! isSelected) {
                    const newoptions = options.filter(element => element.id !== option.id);
                    setOptions(newoptions);
                    props.onChange(newoptions);
                    return;
                }

                let newoptions = options;
                if (optionGroup.max_options) {
                    let existingOptionCount = 0;
                    newoptions = options.filter(element => {
                        if (element.option_group_id !== optionGroup.id) {
                            return true;
                        }

                        existingOptionCount++;
                        return existingOptionCount < optionGroup.max_options;
                    });
                }

                if (optionGroup.options_are_quantifiable) {
                    option.quantity = OPTION.DEFAULT_QUANTITY;
                }
// TODO: sort options by optionGroup order
                newoptions.push(option);
                setOptions(newoptions);
                props.onChange(newoptions);
            }}
            defaultChoices={props.defaultChoices}
            key={'option_group_' + optionGroup.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return <div>
        {optionsComponents}
    </div>
}
