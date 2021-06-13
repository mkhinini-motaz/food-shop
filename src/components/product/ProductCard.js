import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Typography } from '@material-ui/core';

import Card from '../common/Card';
import MoneyFormatter from "../common/MoneyFormatter";
import { BASE_BACKEND_URL } from '../../constants'
import TranslateField from "../common/TranslateField";
import { trySettingProductIsVisible } from "../../store/actions";

export default function ProductCard(props) {
    const dispatch = useDispatch();
    const { product } = props;
    const productId = product.id;

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const cardActionsClassName  = selectedLangWriteFrom === 'right' ? 'flex-row-reverse mr_12px' : '';

    const handleProductIsVisible = (event) => dispatch(trySettingProductIsVisible({ productId, isVisible: event.target.checked }));

    const headerActions = [
        <Switch checked={!! product.is_visible} onChange={handleProductIsVisible} key={'product_is_visible_' + productId} />,
    ];
    return (
        <Card
            title={<TranslateField value={product} field="name" />}
            image={BASE_BACKEND_URL + product.photo}
            showDelay={props.showDelay}
            bottomText={<MoneyFormatter value={product.price} />}
            classes={{ cardActions : cardActionsClassName }}
            headerActions={headerActions}
            disabled
            style={{backgroundColor: "#f5952f"}}
        >
            <Typography variant="body1" color="textSecondary" component="p">
                <TranslateField value={product} field="description" />
            </Typography>
        </Card>
    );
}
