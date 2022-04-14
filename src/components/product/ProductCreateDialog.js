import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import Translate from '../common/Translate';
import OptionGroups from "./OptionGroups";
import TranslateField from "../common/TranslateField";
import QuantityActionButton from "../common/QuantityActionButton";
import MoneyFormatter from "../common/MoneyFormatter";
import { setCartProductTypeWithOptions, hideProductCreateDialog, showSnackbar } from "../../store/actions";
import { indexOptionsByGroup, productPriceForDialog, SnackBarErrorMaxOptions, SnackBarErrorMinOptions } from "../../utils";
import { COLOR_PRIMARY } from "../../constants";

export default function ProductCreateDialog(props) {
    const dispatch = useDispatch();
    const { product, isVisible } = props;

    const [ productCount, setProductCount ]   = React.useState(1);
    const [ optionChoices, setOptionChoices ] = React.useState([]);

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const productChoicesPrice   = productPriceForDialog({ ...product, options: optionChoices, product_count: productCount });

    const textAlign         = selectedLangWriteFrom === 'right' ? ' text-right ' : '';
    const flexRowClassName  = selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : '';
    const textAlignReversed = selectedLangWriteFrom === 'left' ? ' text-right ' : '';

    const productCountOnChange = newCount => { setProductCount(newCount > 0 ? newCount : 1); };
    const onConfirm = () => {
        const indexedOptions = indexOptionsByGroup(optionChoices);
        let optionsForCategory;

        for (let optionGroup of product.option_groups) {
            optionsForCategory = indexedOptions[optionGroup.id] || [];
            if (optionsForCategory.length < optionGroup.min_options) {
                dispatch(showSnackbar(SnackBarErrorMinOptions(optionGroup)));
                return;
            }

            if (optionsForCategory.length > optionGroup.max_options) {
                dispatch(showSnackbar(SnackBarErrorMaxOptions(optionGroup)));
                return;
            }
        }

        dispatch(setCartProductTypeWithOptions({ product_id: product.id, product_count: productCount, options: optionChoices }));
        dispatch(hideProductCreateDialog());
    };

    useEffect(() => {
        setProductCount(1);
        setOptionChoices([]);
    }, [ isVisible ]);

    return (
        <Dialog fullWidth
                open={isVisible}
                onClose={() => dispatch(hideProductCreateDialog())}
        >
            <DialogTitle className="pb-0">
                <div className={textAlign + flexRowClassName + " d-flex align-items-center justify-content-between"}>
                    <Typography className={flexRowClassName + " d-flex align-items-center"} variant="h5" component="span" color="primary" >
                        <TranslateField value={product.name} />
                    </Typography>
                    <span className="pt-1 px-2 text-center color_white" style={{ backgroundColor: COLOR_PRIMARY, borderRadius: 50, }} >
                        <MoneyFormatter value={productChoicesPrice}/>
                    </span>
                </div>
                <div className={textAlignReversed}>
                    <QuantityActionButton classes={{ root: "d-inline" }}
                                          count={productCount}
                                          minimumCount={1}
                                          onClick={productCountOnChange}
                                          style={{ flexGrow: 1 }}
                    />
                </div>
            </DialogTitle>

            <DialogContent className={textAlign + ' word_break_break_word pt-0'}>
                <OptionGroups
                    optionGroups={product.option_groups}
                    defaultChoices={optionChoices}
                    onChange={(optionChoicesNewValue) =>  setOptionChoices([ ...optionChoicesNewValue ])}
                />
            </DialogContent>

            <DialogActions className={flexRowClassName}>
                <Button onClick={() => dispatch(hideProductCreateDialog())} color="primary">
                    <Translate value="common:cancel" />
                </Button>
                <Button variant="contained" onClick={onConfirm} color="primary" className="color_white">
                    <Translate value="common:confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
