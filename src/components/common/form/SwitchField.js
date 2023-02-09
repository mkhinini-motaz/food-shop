import React from 'react';
import { FormControl, InputLabel, Input, Switch } from '@material-ui/core';

export default function SwitchField(props) {
    const shrinkIsFalse = props.shrink === false;
    const labelStyle    = shrinkIsFalse ? {} : { fontSize: '1.25rem' };
    const isRequired    = props.required === undefined ? true : props.required;
    const onChange = (event) => {
        return props.onChange({ ...event, target: { ...event.target, value: event.target.checked } });
    };

    return (
        <FormControl error={props.error} className={'w-100 my-2'} >
            <InputLabel
                htmlFor={'form_input_' + props.name}
                shrink={shrinkIsFalse ? undefined : true}
                variant={props.variant || 'standard'}
                required={isRequired}
                style={labelStyle}
            >
                {props.label}
            </InputLabel>
            <Switch checked={!! props.value} onChange={onChange} className={"mt-4"} />
        </FormControl>
    );
}
