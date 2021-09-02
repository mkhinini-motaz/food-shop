import React from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Chip, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';

import TranslateField from "../common/TranslateField";
import { optionOutput } from "../../utils";

export default function Product(props) {
    const { product, hideDivider } = props;
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    const sideMargin = (selectedLangWriteFrom === 'right' ? 'ml-2' : 'mr-2');

    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);

    const primaryOutput = (
        <span className={'d-flex ' + flexRowClassName}>
            {!! props.minifiedDisplay || ! product.product_count ? '' :
                <Chip label={product.product_count} color="secondary" className={sideMargin + ' font-weight-bold font_size_17px'} />
            }
            <TranslateField value={product.name} />
        </span>
    );

    const secondaryOutput = (
        <span>
            <Typography
                variant="body2"
                color="textPrimary"
                className={'d-flex ' + flexRowClassName}
            >
                <span>{
                    product.option_groups
                        .map(option => optionOutput(option, selectedLang, selectedLangWriteFrom))
                        .join(', ')
                }</span>
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
        <Collapse in={isShown}>
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
