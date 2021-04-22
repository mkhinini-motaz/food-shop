import React from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';

export default function PasswordField(props) {
    const shrinkIsFalse = props.shrink === false;
    const labelStyle    = shrinkIsFalse ? {} : { fontSize: '1.25rem' };
    const isRequired    = props.required === undefined ? true : props.required;

    return (
        <div>
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
                <Input
                    id={'form_input_' + props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange ? props.onChange : () => {}}
                    type="password"
                    required={isRequired}
                />
            </FormControl>
        </div>
    );
}
