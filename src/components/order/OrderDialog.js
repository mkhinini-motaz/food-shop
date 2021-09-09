import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, } from '@material-ui/core';

import Translate from '../common/Translate';
import ProductList from "../cart/ProductList";
import {hideOrderDialog} from "../../store/actions";

export default function OrderDialog(props) {
    const { order, isVisible, onCancel } = props;
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    return (
        <Dialog
            open={isVisible}
            onClose={onCancel}
        >
            <DialogContent className={textAlign + ' word_break_break_word'}>
                <ProductList order={order} withBorders={true} />
            </DialogContent>


            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideOrderDialog())} color="primary">
                    <Translate value="common:cancel" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
