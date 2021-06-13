import React from 'react';
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, } from '@material-ui/core';

import Translate from './Translate';

export default function ConfirmDialog(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    return (
        <Dialog
            open={props.isVisible}
            onClose={props.onCancel}
        >
            <DialogTitle className={textAlign}>
                {props.title}
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word'}>
                {props.content}
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={props.onCancel} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={props.onConfirm} color="primary">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
