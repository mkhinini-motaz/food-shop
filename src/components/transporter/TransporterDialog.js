import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, } from '@material-ui/core';

import Translate from '../common/Translate';
import ShopTransporter from "../shopUser/ShopTransporter";
import Loader from "../common/Loader";
import { attachTransporterToOrder, hideTransporterDialog } from "../../store/actions";

export default function TransporterDialog(props) {
    const dispatch = useDispatch();
    const { isVisible, order } = props;
    const shopUsers = useSelector(state => state.ShopUserReducer.shopUsers.data);
    const shopUsersAreLoading = useSelector(state => state.ShopUserReducer.shopUsersAreLoading);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const textAlign = selectedLangWriteFrom === 'right' ? 'text-right' : '';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    return (
        <Dialog
            fullWidth
            maxWidth={"xs"}
            open={isVisible}
            onClose={() => dispatch(hideTransporterDialog())}
        >
            <DialogContent className={textAlign + ' word_break_break_word'}>
                {shopUsersAreLoading ?
                    <Loader />:
                    shopUsers.map(shopUser => {
                        return  <ShopTransporter key={'shop_transporter_' + shopUser.id}
                                                 shopTransporter={shopUser}
                                                 isSelected={!! order.shop_transporter && order.shop_transporter.id === shopUser.id}
                                                 onClick={() => dispatch(attachTransporterToOrder(order.id, shopUser.id))}
                                                 onClear={() => dispatch(attachTransporterToOrder(order.id, null))}
                        />
                        }
                    )
                }
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideTransporterDialog())} color="primary">
                    <Translate value="common:cancel" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
