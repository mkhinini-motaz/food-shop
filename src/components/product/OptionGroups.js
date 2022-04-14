import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import OptionGroup from './OptionGroup';
import { COMPONENT_SHOW_DELAY, OPTION } from "../../constants";
import { showSnackbar } from "../../store/actions";
import { SnackBarErrorMaxOptions } from "../../utils";

export default function OptionGroups(props) {
    const dispatch = useDispatch();
    const [ options, setOptions ] = useState([]);
    const optionsComponents = [];
    let showDelay = 0;

    const onQuantityChange = (selectedOption, quantity) => {
        let newOptions = options;
        newOptions.forEach(option => {
            if (option.id === selectedOption.id) {
                option.quantity = quantity;
            }
        });
        setOptions(newOptions);
    };

    const createOnChangeHandler = optionGroup => (option, isSelected) => {
        if (! isSelected) {
            const newOptions = options.filter(element => element.id !== option.id);
            setOptions(newOptions);
            props.onChange(newOptions);
            return;
        }

        const existingOptionsForGroup = options.filter(element => element.option_group_id === option.option_group_id);
        const newOptions = options;
        if (existingOptionsForGroup.length >= optionGroup.max_options) {
            dispatch(showSnackbar(SnackBarErrorMaxOptions(optionGroup)));
            return;
        }

        if (optionGroup.options_are_quantifiable) {
            option.quantity = OPTION.DEFAULT_QUANTITY;
        }

// TODO: sort options by order
        newOptions.push(option);
        setOptions(newOptions);
        props.onChange(newOptions);
    };

    for (let optionGroup of props.optionGroups || []) {
        optionsComponents.push(<OptionGroup
            optionGroup={optionGroup}
            showDelay={showDelay}
            onQuantityChange={onQuantityChange}
            onChange={createOnChangeHandler(optionGroup)}
            defaultChoices={props.defaultChoices}
            key={'option_group_' + optionGroup.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return <div>
        {optionsComponents}
    </div>
}
