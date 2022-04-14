import React from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Chip, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';

import TranslateField from "../common/TranslateField";
import { optionGroupsOutput } from "../../utils";
import MoneyFormatter from "../common/MoneyFormatter";

export default function Product(props) {
    const { product, hideDivider } = props;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    const primaryOutput = (
        <span className={'d-flex justify-content-between ' + flexRowClassName}>
            <span className={'d-flex align-items-center ' + flexRowClassName}>
                {! product.product_count ? '' :
                    <span>
                        <span>{product.product_count}</span>
                        <span className="mx-1"> X </span>
                    </span>
                }
                <TranslateField value={product.category.name} />
                <span className="mx-1"> - </span>
                <TranslateField value={product.name} />
            </span>
            {product.total}
        </span>
    );

    const secondaryOutput = (
        <span>
            <Typography
                variant="body2"
                color="textPrimary"
                component="span"
                className={'d-flex ' + flexRowClassName}
            >
                {optionGroupsOutput(product.option_groups, product.product_count, selectedLang)}
            </Typography>
            {! props.minifiedDisplay ? '' :
                <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    className={'d-flex ' + flexRowClassName}
                >
                    {! product.product_count ? '' : <span>{product.product_count}</span>}
                    {! product.product_count ? '' : <span className="mx-1">-</span>}
                    <span>{product.total}</span>
                </Typography>
            }
        </span>
    );

    return (
        <Collapse in={true}>
            <ListItem className={flexRowClassName + ' ' + props.className}>
                {!product.photo || props.minifiedDisplay === false ? '' :
                    <ListItemAvatar><Avatar alt="product" src={product.photo} /></ListItemAvatar>
                }
                <ListItemText
                    primary={primaryOutput}
                    className={'d-inline text-' + selectedLangWriteFrom + ' ' + flexRowClassName}
                    secondary={secondaryOutput}
                />
            </ListItem>
            {hideDivider ? '' : <Divider className={props.minifiedDisplay === false ? 'mx-0' : ''} variant="inset" component="li" />}
      </Collapse>
    );
}
