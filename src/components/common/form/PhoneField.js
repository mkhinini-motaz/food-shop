import React from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import InputMask from 'react-input-mask'

import { LOCAL_PHONE_MASK } from '../../../constants';
import { shortPhone } from '../../../utils';

export default function PhoneField(props) {
    const shrinkIsFalse = props.shrink === false;
    const labelStyle    = shrinkIsFalse ? {} : { fontSize: '1.25rem' };
    const isRequired    = props.required === undefined ? true : props.required;

    return (
        <FormControl error={props.error} className="w-100 my-2">
            <InputMask
                mask={LOCAL_PHONE_MASK}
                maskChar=" "
                value={props.value}
                onChange={(event) => {
                    event.target.value = shortPhone(event.target.value);
                    props.onChange(event)
                }}
            >
                {() => <div >
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
                        className={'w-100'}
                        name={props.name}
                        required={isRequired}
                    />
                </div>}
            </InputMask>
        </FormControl>

    );
}
