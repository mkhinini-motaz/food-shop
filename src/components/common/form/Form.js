import React from 'react';
import FormField from './FormField';

export default function Form(props) {

    const initialValue = props.initialValue || {};
    let [value, setValue] = React.useState(initialValue)
    let fieldComponents = [];
    for (let fieldDescription of props.fieldDescriptions) {
        fieldComponents.push(
            <FormField
                key={'form-field-' + fieldDescription.name + '-' + fieldDescription.type}
                {...fieldDescription}
                value={value[fieldDescription.name]}
                onChange={(event) => {
                    setValue({...value, [fieldDescription.name]: event.target.value});
                    if (typeof props.onChange === 'function') {
                        props.onChange({...value, [fieldDescription.name]: event.target.value});
                    }
                }}
            />
        );
    }

    return (
        <form
            className={'w-100 ' + props.className}
            key={'form-' + props.fieldDescriptions.length}
            onSubmit={(event) => {
                event.preventDefault();
                if (typeof props.onSubmit === 'function') {
                    props.onSubmit(value);
                }
                return false;
            }}
        >
            {fieldComponents}
        </form>
    );
}
