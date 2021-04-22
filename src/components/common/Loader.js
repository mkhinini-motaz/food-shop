import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function Card(props) {
    const style = props.style ? props.style : {};
    return (
        <div className="h-100 mt-1">
            <CircularProgress size={props.size || 30} style={style} />
        </div>
    );
  }
