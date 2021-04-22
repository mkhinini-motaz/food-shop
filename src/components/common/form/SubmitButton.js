import React from 'react';
import { Button } from '@material-ui/core';

import Loader from '../Loader';

export default function SubmitButton(props) {
    let buttonStyle = {};
    if (props.color) {
        buttonStyle.color = props.color;
    }
    if (props.backgroundColor) {
        buttonStyle.backgroundColor = props.backgroundColor;
    }

    const className = (props.className ? props.className : '') + (props.fullWidth ? ' w-100' : '');

    return (
        <div key="form-submit-button" className="w-100 my-2">
            {props.isLoading ?
                <Loader size={40} /> :
                <Button variant="contained" className={className} style={buttonStyle} type="submit">
                    {props.label}
                </Button>
            }
        </div>
    );
}
