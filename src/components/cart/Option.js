import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Checkbox, Typography, Zoom } from '@material-ui/core';
import Grow from "@material-ui/core/Grow/Grow";

import { BASE_BACKEND_URL, COLOR_PRIMARY, COLOR_SECONDARY, FORM_FIELD_TYPE_SLIDER, IMAGE_WITH_TEXT_TINT, OPTION } from "../../constants";
import TranslateField from "../common/TranslateField";
import Form from "../common/form/Form";
import MoneyFormatter from "../common/MoneyFormatter";

export default function Option(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const checkboxContainerClassName = ' pt-3 ' + (selectedLangWriteFrom === 'left' ? 'pr-3' : 'pl-3');
    const classes = makeStyles({
        root: {
            position: 'relative',
            height: 60,
        },
        checkbox: {
            transform: "scale(2.5)",
            zIndex: 5,
            '&:hover': { backgroundColor: 'transparent', },
        },
        checkboxContainer: {
            position: 'absolute',
            width: '100%',
            textAlign:  selectedLangWriteFrom === 'left' ? 'right' : 'left',
        },
        title: {
            color: 'white',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            bottom: '45%',
            left: 0,
        },
        sliderFormContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '5%',
        },
        sliderBackground: {
            width: '60%',
            color: COLOR_PRIMARY,
            backgroundColor: COLOR_SECONDARY + '33',
            borderRadius: '15px',
        },
        media: {
            height: '100%',
            width: '100%',
            background: IMAGE_WITH_TEXT_TINT + ', url(' + BASE_BACKEND_URL + props.option.photo + ');',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px',
        },
        icon: {
            borderRadius: 3,
            width: 40,
            height: 40,
            color: COLOR_SECONDARY,
            '$root.Mui-focusVisible &': {
                outline: '2px auto rgba(19,124,189,.6)',
                outlineOffset: 2,
            },
        },
        optionPrice: {
            backgroundColor: COLOR_PRIMARY,
            position: "absolute",
            color: 'white',
            zIndex: 3,
            textAlign: 'center',
            textTransform: 'uppercase',
            padding: 5,
            top: 0,
            [selectedLangWriteFrom === 'left' ? 'left' : 'right']: 0,
            minWidth: '40px',
            fontSize: '17px',
            fontWeight: '500',
            borderRadius: selectedLangWriteFrom === 'right' ? '0 15px 0 15px' : '15px 0 15px 0',
        },
    })();

    const writeFromCssRule = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    const formDescription = [
        {
            name: 'quantity',
            required: false,
            type: FORM_FIELD_TYPE_SLIDER,
            min: OPTION.QUANTITIES.QUANTITY_A_LITTLE,
            max: OPTION.QUANTITIES.QUANTITY_EXTRA,
            defaultValue: OPTION.DEFAULT_QUANTITY,
            marks: [
                { value: OPTION.QUANTITIES.QUANTITY_A_LITTLE },
                { value: OPTION.QUANTITIES.QUANTITY_MEDIUM },
                { value: OPTION.QUANTITIES.QUANTITY_EXTRA },
            ],
        }
    ];

    return (
        <Grow in={true}>
            <div className={classes.root + ' ' + writeFromCssRule + ' my-2 mx-2 row'}>
                <div className={classes.media} />
                {! props.option.price ? '' :
                    <div className={classes.optionPrice}>
                        <span className="mx-1">+</span>
                        <MoneyFormatter value={props.option.price} inline />
                    </div>
                }

                <Typography className={classes.title} variant="h6" component="h4">
                    <TranslateField value={props.option.name} />
                </Typography>
                <div className={classes.checkboxContainer + checkboxContainerClassName}>
                    <Checkbox
                        onChange={(event) => props.onChange(event.target.checked)}
                        color="primary"
                        className={classes.checkbox}
                        checked={props.isSelected}
                    />
                </div>

                <Zoom in={props.isQuantifiable && props.isSelected}>
                    <div className={classes.sliderFormContainer}>
                        <div className={classes.sliderBackground + ' px-3'}>
                            <Form
                                initialValue={{ quantity: OPTION.DEFAULT_QUANTITY}}
                                fieldDescriptions={formDescription}
                                onChange={({ quantity }) => props.onQuantityChange(quantity)}
                            />
                        </div>
                    </div>
                </Zoom>
            </div>
        </Grow>
    );
}
