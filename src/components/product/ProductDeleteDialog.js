import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@material-ui/core';

import Translate from '../common/Translate';

export default function ProductDeleteDialog(props) {
    const { product, isVisible, onConfirm, onCancel } = props;
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    return (
        <Dialog
            open={isVisible}
            onClose={onCancel}
        >
            <DialogTitle className={textAlign}>
                <Typography variant="h4" component="span" color="primary">
                    <Translate value="product:delete"/>
                </Typography>
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word'}>
                Delete
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={onCancel} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={() => {
                    onConfirm();
                }} color="primary">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
