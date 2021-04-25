import React from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Collapse, Divider, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';

import TranslateField from "../common/TranslateField";
import { translate, translateField } from "../../i18n";

export default function Product(props) {
    const { product, hideDivider } = props;
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLang = useSelector(state => state.I18nReducer.selectedLang);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);

    return (
        <Collapse in={isShown}>
            <ListItem className={flexRowClassName + ' ' + props.className}>
                {!product.photo || props.minifiedDisplay === false ? '' : <ListItemAvatar><Avatar alt="product" src={product.photo} /></ListItemAvatar>}
                <ListItemText
                primary={<span>
                    {!!props.minifiedDisplay ? '' :
                        <span>
                            {! product.product_count ? '' : <span>{product.product_count}</span>}
                            {! product.product_count ? '' : <span className="mx-1">-</span>}
                        </span>
                    }
                    <TranslateField value={product} field="name" />
                </span>}
                className={'d-inline text-' + selectedLangWriteFrom + ' ' + flexRowClassName}
                secondary={
                    <span>
                        <Typography
                            component="div"
                            variant="body2"
                            color="textPrimary"
                            className={'d-flex ' + flexRowClassName}
                        >
                            <span>{
                                product.ingredient_categories.map(ingredientCategory =>
                                    ingredientCategory.ingredients.map(element => {
                                        return translateField(element, 'name', selectedLang, true) +
                                            (! element.quantity ? '' : ' (' + translate('ingredient:quantity:' + element.quantity, selectedLang, true) +
                                            ')');
                                    }).join(', ')
                                ).join(', ')
                            }</span>
                        </Typography>
                        {!props.minifiedDisplay ? '' :
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
                }
                />
            </ListItem>
            {hideDivider ? '' : <Divider className={props.minifiedDisplay === false ? 'mx-0' : ''} variant="inset" component="li" />}
      </Collapse>
    );
}
