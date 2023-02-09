import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Switch, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import TranslateField from "../common/TranslateField";
import { useDispatch, useSelector } from "react-redux";
import { trySettingProductIsVisible } from "../../store/actions";
import { COLOR_PRIMARY } from "../../constants";

export default function Product(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { product } = props;
    const productId = product.id;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'd-flex justify-content-between flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    const handleProductIsVisible = (event) => dispatch(trySettingProductIsVisible({ productId, isVisible: event.target.checked }));
    const goToProductEdit = () => history.push('/product/' + productId + '/edit');

    return (
        <div className={'col-12'} >
            <div className={flexRowClassName}>
                <Typography gutterBottom variant="h5" component="h2" align={selectedLangWriteFrom}>
                    <TranslateField value={product.name} />
                </Typography>
                <div>
                    <Button onClick={goToProductEdit} style={{ backgroundColor: COLOR_PRIMARY, minWidth: '40px' }} >
                        <EditIcon style={{ color: 'white' }} />
                    </Button>
                    <Switch checked={!! product.is_visible} onChange={handleProductIsVisible} key={'product_is_visible_' + productId} />
                </div>
            </div>
        </div>
    );
};

