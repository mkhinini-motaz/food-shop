import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core';

import Card from '../common/Card';
import MoneyFormatter from "../common/MoneyFormatter";
import { BASE_BACKEND_URL } from '../../constants'
import TranslateField from "../common/TranslateField";

export default function ProductCard(props) {
    const dispatch = useDispatch();
    const { product } = props;

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const cardActionsClassName  = selectedLangWriteFrom === 'right' ? 'flex-row-reverse mr_12px' : '';
    const flexRowClassName      = selectedLangWriteFrom === 'right' ? 'd-flex flex-row-reverse justify-content-end' : '';

    const actions = [
        // TODO: implement
    ];
    return (
        <Card
            title={<TranslateField value={product} field="name" />}
            image={BASE_BACKEND_URL + product.photo}
            actions={actions}
            showDelay={props.showDelay}
            bottomText={<MoneyFormatter value={product.price} />}
            classes={{ cardActions : cardActionsClassName }}
            disabled
            style={{backgroundColor: "#f5952f"}}
        >
            <Typography variant="body1" color="textSecondary" component="p">
                <TranslateField value={product} field="description" />
            </Typography>
        </Card>
    );
}
