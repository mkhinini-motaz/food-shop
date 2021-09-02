import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { Button, Switch } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Card from '../common/Card';
import { BASE_BACKEND_URL } from '../../constants'
import TranslateField from "../common/TranslateField";
import {trySettingCategoryIsVisible} from "../../store/actions";

export default function CategoryCard(props) {
    const category = props.category;
    const categoryId = category.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const textAlign = selectedLangWriteFrom === 'right' ? 'text-left' : 'text-right';
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse' : '';

    const goToCategoryShow = () => history.push('/category/' + categoryId + '/product');
    const handleCategoryIsVisible = (event) => dispatch(trySettingCategoryIsVisible({ categoryId: categoryId, isVisible: event.target.checked }));

    const headerActions = [
        (<Button onClick={goToCategoryShow} key={'go_to_category_show_' + categoryId}>
            <VisibilityIcon />
        </Button>),
        <Switch checked={!! category.is_visible} onChange={handleCategoryIsVisible} key={'category_is_visible_' + categoryId} />,
    ];

    return (
        <Card
            title={<TranslateField value={category.name} />}
            image={BASE_BACKEND_URL + category.photo}
            headerActions={<div className={flexRowClassName + ' ' + textAlign}>{headerActions}</div>}
            showDelay={props.showDelay}
            disabled
        >
            <Typography variant="body1" color="textSecondary" component="p">
                <TranslateField value={category.description} />
            </Typography>
        </Card>
    );
}
