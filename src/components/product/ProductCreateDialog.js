import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import Translate from '../common/Translate';
import IngredientCategories from "../cart/IngredientCategories";
import { hideOrderDialog } from "../../store/actions";
import TranslateField from "../common/TranslateField";

export default function ProductCreateDialog(props) {
    const dispatch = useDispatch();
    const { product, isVisible } = props;
    const [ ingredientChoices, setIngredientChoices ] = React.useState([]);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    return (
        <Dialog
            fullWidth
            open={isVisible}
            onClose={() => dispatch(hideOrderDialog())}
        >
            <DialogTitle className={textAlign}>
                <Typography variant="h4" component="span" color="primary">
                    <TranslateField value={product} field="name" />
                </Typography>
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word'}>
                <IngredientCategories
                    ingredientCategories={product.ingredient_categories}
                    defaultChoices={ingredientChoices}
                    onChange={(ingredientChoicesNewValue) => {
                        setIngredientChoices([ ...ingredientChoicesNewValue ]);
                    }}
                />
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideOrderDialog())} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={() => {
                    // TODO: implement
                    dispatch(hideOrderDialog());
                }} color="primary">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
