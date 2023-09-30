import React from 'react';
import { FormControl, InputLabel, Input, Typography } from '@material-ui/core';
import Translate from "../Translate";
import { useSelector } from "react-redux";

const onChange = (langKey, value, onChangeProp) => (event) => {
    return onChangeProp({ target: { value: { ...value, [langKey]: event.target.value } } });
};

const Field = (props) => {
    const shrinkIsFalse = props.shrink === false;
    const labelStyle    = shrinkIsFalse ? {} : { fontSize: '1.25rem' };
    const isRequired    = props.required === undefined ? true : props.required;
    return (
        <FormControl error={props.error} className={'w-100 my-2'} >
            <InputLabel
                htmlFor={'form_input_' + props.name + '_' + props.langKey}
                shrink={shrinkIsFalse ? undefined : true}
                variant={props.variant || 'standard'}
                required={isRequired}
                style={labelStyle}
            >
                <Translate value={"lang:" + props.langKey}/>
            </InputLabel>
            <Input
                id={'form_input_' + props.name + '_' + props.langKey}
                name={props.name + '_' + props.langKey}
                value={(props.value && props.value.hasOwnProperty(props.langKey)) ? props.value[props.langKey] : ''}
                onChange={onChange(props.langKey, props.value, props.onChange)}
                type={props.isHidden ? 'password' : props.type}
                required={isRequired}
                multiline={!! props.multiline}
                className={'translated_input_' + props.langKey}
            />
        </FormControl>
    );
}

export default function TranslatableTextField(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    return (
        <div className={'w-100 my-2'} >
            <Typography variant="h6" component="h6" align={selectedLangWriteFrom} style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                <Translate value={props.name} textOnly={true}/>
            </Typography>
            <div className={'p-2'} style={{ borderRadius: 20, borderWidth: 1, borderColor: '#dddddd', borderStyle: 'solid' }}>
                {[ 'en', 'fr', 'tnfr', 'tnar', 'ar' ].map(langKey => <Field key={'translatable_field_' + langKey} langKey={langKey} {...props} />)}
            </div>
        </div>
    );
}
