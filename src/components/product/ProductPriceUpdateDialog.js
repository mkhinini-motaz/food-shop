import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import { BASE_SHOP_API_URL, STATUSES } from "../../constants";

import Loader from "../common/Loader";
import Translate from '../common/Translate';
import { hideProductPriceUpdateDialog, showSnackbar, setIsLoading, fetchCategories } from "../../store/actions";
import TextField from "../common/form/TextField";
import axios from "axios";
import MoneyFormatter from "../common/MoneyFormatter";

export default function ProductPriceUpdateDialog(props) {
    const { product, isVisible } = props;
    const dispatch = useDispatch();
    const [newPrice, setNewPrice] = useState();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const isLoading = useSelector(state => state.LoaderReducer.isLoading);

    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    const onClose = () => dispatch(hideProductPriceUpdateDialog());
    const onConfirm = () => {
        if (! newPrice || ! /[1-9][0-9]*[50]0$/.exec(newPrice)) {
            dispatch(showSnackbar({ message: 'product:price:validation.regex', severity: 'error' }));
            return;
        }

        dispatch(setIsLoading(true));
        axios.post(BASE_SHOP_API_URL + '/product/' + product.id, { ...product, price: newPrice })
            .then(response => {
                dispatch(showSnackbar({ message: 'product:edit:success' }));
                dispatch(fetchCategories({ orderBy: 'order', orderDirection: 'asc' }));
                setNewPrice();
                onClose();
            })
            .catch(error => {
                if (error.response.status === 422 && error.response.data.errors.price) {
                    dispatch(showSnackbar({ message: 'product:price:' + error.response.data.errors.price[0], severity: 'error' }));
                } else {
                    dispatch(showSnackbar({ message: 'product:edit:error', severity: 'error' }));
                }
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    };

    return (
        <Dialog open={isVisible} onClose={onClose} >
            <DialogContent className={textAlign + ' word_break_break_word'}>
                <div>
                    <Typography variant="span" component="span" color="textPrimary" align={selectedLangWriteFrom}>
                        <Translate value="product:old_price" textOnly={true} />
                    </Typography>
                    <Typography variant="h6" component="span" color="primary" align={selectedLangWriteFrom}>
                        <MoneyFormatter value={product.price} />
                    </Typography>
                </div>
                <TextField value={newPrice}
                           type={'number'}
                           inputmode={'numeric'}
                           step="50"
                           label={<Translate value="product:new_price" />}
                           onChange={(event) => setNewPrice(event.target.value)}
                           required={false}
                />
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                {isLoading ? <Loader size={40} /> : [
                    <Button onClick={onClose} color="primary" key="product_price_update_dialog_cancel_btn" >
                        <Translate value="common:cancel" />
                    </Button>,
                    <Button variant="contained" onClick={onConfirm} color="primary" key="product_price_update_dialog_confirm_btn" >
                        <Translate value="common:confirm" />
                    </Button>
                ]}
            </DialogActions>
        </Dialog>
    );
}
