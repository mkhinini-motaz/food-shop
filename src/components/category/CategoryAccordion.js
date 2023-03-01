import React from 'react';
import { Typography, Switch, Button, Chip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import TranslateField from "../common/TranslateField";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ProductList from "../product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { trySettingCategoryIsVisible } from "../../store/actions";
import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";
import Translate from "../common/Translate";

export default function CategoryAccordion(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { category, isExpanded, onExpand } = props;
    const categoryId = category.id;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'd-flex justify-content-between flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    const handleCategoryIsVisible = (event) => dispatch(trySettingCategoryIsVisible({ categoryId: categoryId, isVisible: event.target.checked }));
    const goToCategoryEdit = () => history.push('/category/' + categoryId + '/edit');

    return (
        <div className={'col-12 col-sm-6 col-lg-4 p-2'}>
            <div className={'bg-white border_radius_15 p-2'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <div className={flexRowClassName}>
                    <Typography gutterBottom variant="h4" component="h2" color={'primary'}>
                        <TranslateField value={category.name} />
                    </Typography>
                    <div>
                        <Switch checked={!! category.is_visible} onChange={handleCategoryIsVisible} key={'category_is_visible_' + categoryId} />

                        <Button onClick={goToCategoryEdit} style={{ backgroundColor: COLOR_PRIMARY, minWidth: '40px' }} >
                            <EditIcon style={{ color: 'white' }} />
                        </Button>
                        <Button onClick={onExpand || (() => {})} style={{ minWidth: '40px' }} >
                            <VisibilityIcon style={{ color: isExpanded ? '#fcbf49' : '' }} />
                        </Button>
                    </div>
                </div>
                <div className={"p-2"} style={{ display: isExpanded ? '' : 'none' }}>
                    <ProductList products={category.products}/>
                </div>
            </div>
        </div>
    );
};

