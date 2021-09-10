import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, } from '@material-ui/core';

import Translate from '../common/Translate';
import ProductList from "../cart/ProductList";
import {hideOrderDialog} from "../../store/actions";
import Order from "./Order";

export default function OrderDialog(props) {
    const { order, isVisible, onCancel } = props;
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const textAlign = selectedLangWriteFrom === 'right' ? ' text-right ' : ' ';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    return (
        <Dialog
            open={isVisible}
            onClose={onCancel}
        >
            <DialogContent className={textAlign + 'p-0'}>
                <Order order={order} showTotal />
            </DialogContent>


            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideOrderDialog())} color="primary">
                    <Translate value="common:close" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
