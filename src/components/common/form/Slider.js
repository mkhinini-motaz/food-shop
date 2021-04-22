import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slider as MuiSlider } from '@material-ui/core';

const StyledSlider = withStyles({
    root: {
        height: 6,
    },
    thumb: {
        height: 18,
        width: 18,
        border: '2px solid currentColor',
        marginTop: -6,
        marginLeft: -9,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 6,
        borderRadius: 4,
        zIndex: 10,
    },
    rail: {
        height: 6,
        borderRadius: 4,
    },
})(MuiSlider);


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    margin: {
        height: theme.spacing(3),
    },
}));

export default function Slider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.label || ''}
            <StyledSlider
                className="h-100"
                defaultValue={props.defaultValue || props.marks[0].value}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={props.min}
                max={props.max}
                valueLabelDisplay="off"
                marks={props.marks}
                onChange={(event, newValue) => props.onChange({ target: { value: newValue } })}
            />
        </div>
    );
}
