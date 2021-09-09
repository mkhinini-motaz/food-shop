import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { STATUSES } from "../../constants";

import Loader from "../common/Loader";
import OrderStatus from "./OrderStatus";
import Translate from '../common/Translate';
import { updateOrderStatus, hideOrderStatusEditDialog } from "../../store/actions";

export default function OrderStatusUpdateDialog(props) {
    const { order, isVisible, isLoading } = props;
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
    };

    useEffect(() => { setSelectedStatus(order.status) }, [order]);

    return (
        <Dialog open={isVisible} onClose={onClose} >
            <DialogContent className={textAlign + ' word_break_break_word'}>
                {STATUSES.map(status =>
                    <OrderStatus key={'order_status_' + status}
                                 order={{status}}
                                 onClick={() => setSelectedStatus(status)}
                                 isSelected={selectedStatus === status}
                                 withCheck
                    />
                )}
            </DialogContent>


            <DialogActions className={flexRowClassName}>
                {isLoading ?
                    <Loader size={40} /> :
                    [
                        <Button onClick={onClose} color="primary" key="order_status_update_dialog_cancel_btn" >
                            <Translate value="common:cancel" />
                        </Button>,
                        <Button variant="contained" onClick={onConfirm} color="primary" key="order_status_update_dialog_confirm_btn" >
                            <Translate value="common:confirm" />
                        </Button>
                    ]
                }

            </DialogActions>
        </Dialog>
    );
}
