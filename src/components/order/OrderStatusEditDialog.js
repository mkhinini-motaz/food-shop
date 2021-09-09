import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, h} from '@material-ui/core';
import { STATUSES } from "../../constants";

import Translate from '../common/Translate';
import {hideOrderStatusEditDialog} from "../../store/actions/orderStatusEditDialog";
import OrderStatus from "./OrderStatus";
import {getCurrentOrders, updateOrderStatus} from "../../store/actions";

export default function OrderStatusEditDialog(props) {
    const { order, isVisible } = props;
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState(order.status);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    const onClose = () => dispatch(hideOrderStatusEditDialog());
    const onConfirm = () => {
        if (selectedStatus !== order.status) {
            dispatch(updateOrderStatus(order.id, selectedStatus));
        }
        dispatch(hideOrderStatusEditDialog())
    };

    useEffect(() => { setSelectedStatus(order.status) }, [order]);

// TODO: loader inside confirm button

    return (
        <Dialog open={isVisible} onClose={onClose} >
            <DialogContent className={textAlign + ' word_break_break_word'}>
                {STATUSES.map(status =>
                    <OrderStatus order={{status}}
                                 onClick={() => setSelectedStatus(status)}
                                 isSelected={selectedStatus === status}
                                 withCheck
                    />
                )}
            </DialogContent>


            <DialogActions className={flexRowClassName}>
                <Button onClick={onClose} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={onConfirm} color="primary">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
