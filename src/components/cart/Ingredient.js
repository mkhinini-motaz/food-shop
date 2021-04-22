import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Checkbox, Typography, Zoom } from '@material-ui/core';
import Grow from "@material-ui/core/Grow/Grow";

import { BASE_BACKEND_URL, COLOR_PRIMARY, COLOR_SECONDARY, FORM_FIELD_TYPE_SLIDER, IMAGE_WITH_TEXT_TINT, INGREDIENT } from "../../constants";
import TranslateField from "../common/TranslateField";
import Form from "../common/form/Form";

export default function Ingredient(props) {
    const classes = makeStyles({
        root: {
            position: 'relative',
            height: 130,
        },
        checkbox: {
            '&:hover': { backgroundColor: 'transparent', },
        },
        checkboxContainer: {
            position: 'absolute',
            width: '100%',
            textAlign: 'right',
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
            position: 'absolute',
            width: '90%',
            textAlign: 'center',
            bottom: '5%',
            left: '5%',
            color: COLOR_PRIMARY,
            backgroundColor: COLOR_SECONDARY + '33',
            borderRadius: '15px',
        },
        media: {
            height: '100%',
            width: '100%',
            background: IMAGE_WITH_TEXT_TINT + ', url(' + BASE_BACKEND_URL + props.ingredient.photo + ');',
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
    })();
    const [ isShown, setIsShown ] = React.useState(false);
    const [ isSelected, setIsSelected ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const writeFromCssRule      = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    const formDescription = [
        {
            name: 'quantity',
            required: false,
            type: FORM_FIELD_TYPE_SLIDER,
            min: INGREDIENT.QUANTITIES.QUANTITY_A_LITTLE,
            max: INGREDIENT.QUANTITIES.QUANTITY_EXTRA,
            defaultValue: INGREDIENT.DEFAULT_QUANTITY,
            marks: [
                { value: INGREDIENT.QUANTITIES.QUANTITY_A_LITTLE },
                { value: INGREDIENT.QUANTITIES.QUANTITY_MEDIUM },
                { value: INGREDIENT.QUANTITIES.QUANTITY_EXTRA },
            ],
        }
    ];

    return (
        <Grow in={isShown}>
            <div className={classes.root + ' ' + writeFromCssRule + ' my-2 mx-2 row'}>
                <div className={classes.media} />

                <Typography className={classes.title} variant="h6" component="h4">
                    <TranslateField value={props.ingredient} field="name" />
                </Typography>
                <div className={classes.checkboxContainer}>
                    <Checkbox
                        onChange={(event) => {
                            setIsSelected(event.target.checked);
                            props.onChange(event.target.checked);
                        }}
                        color="primary"
                        style={{ transform: "scale(1.2)" }}
                        className={classes.checkbox}
                        checked={props.isSelected}
                    />
                </div>

                <Zoom in={props.isQuantifiable && isSelected}>
                    <div className={classes.sliderFormContainer + ' px-3'}>
                        <Form
                            initialValue={{ quantity: INGREDIENT.DEFAULT_QUANTITY}}
                            fieldDescriptions={formDescription}
                            onChange={({ quantity }) => props.onQuantityChange(quantity)}
                        />
                    </div>
                </Zoom>
            </div>
        </Grow>
    );
}
