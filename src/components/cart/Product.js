import React from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Chip, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';

import TranslateField from "../common/TranslateField";
import { optionsOutput } from "../../utils";
import MoneyFormatter from "../common/MoneyFormatter";
import { PRODUCT } from "../../constants";
import { translate } from '../../i18n';

export default function Product(props) {
    const { product, hideDivider } = props;
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    const primaryOutput = (
        <span className={'d-flex justify-content-between ' + flexRowClassName}>
            <span className={'d-flex align-items-center ' + flexRowClassName}>
                {! product.product_count ? '' :
                    <span className={'lang_aware mw_60'}>
                        <span className={'lang_aware'}>{product.type !== PRODUCT.TYPE_WEIGHTABLE ? product.product_count :
                            (product.product_count > 999 ?
                                [<span>{(product.product_count / 1000).toString().replace('.', ',')}</span>, translate('common:kg', selectedLang)] :
                                [<span>{product.product_count}</span>, translate('common:g', selectedLang)])
                        }</span>
                        <span className="mx-1"> X </span>
                    </span>
                }
                <TranslateField value={product.category.name} />
                <span className="mx-1"> - </span>
                <TranslateField value={product.name} />
            </span>
            <span className={'font-weight-bold'}>
                {product.total}
            </span>
        </span>
    );

    const secondaryOutput = (
        <span>
            <Typography
                variant="body1"
                color="textPrimary"
                component="span"
                className={'d-flex ' + flexRowClassName}
            >
                <span dangerouslySetInnerHTML={{ __html: product.options_str }} />
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
