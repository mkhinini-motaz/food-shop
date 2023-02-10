import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core'
import { BASE_SHOP_API_URL, BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, FORM_FIELD_TYPE_IMAGE, FORM_FIELD_TYPE_SUBMIT, FORM_FIELD_TYPE_SWITCH, FORM_FIELD_TYPE_TRANSLATABLE_TEXT } from "../../constants";
import axios from "axios";
import { setIsLoading, showSnackbar } from "../../store/actions";
import Translate from "../../components/common/Translate";
import Form from "../../components/common/form/Form";

export default function ProductEdit(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = props;
    const [product, setCategory] = useState({});
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    useEffect(() => {
        dispatch(setIsLoading(true));
        axios.get(BASE_SHOP_API_URL + '/product/' + productId)
        .then(response => {
            setCategory(response.data.data)
        })
        .finally(() =>  dispatch(setIsLoading(false)))
    }, [dispatch]);

    const onSubmit = formData => {
        let data = new FormData()
        for (let lang of ['en', 'fr', 'tnfr', 'tnar', 'ar']) {
            data.append('name[' + lang + ']', formData.name[lang]);
            data.append('description[' + lang + ']', formData.description[lang]);
        }

        data.append('is_visible', formData.is_visible ? 1 : 0);
        data.append('photo', formData.photo);
        data.append('price', formData.price);

        dispatch(setIsLoading(true));
        axios.post(BASE_SHOP_API_URL + '/product/' + productId, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
            dispatch(showSnackbar({ message: 'product:edit:success' }));
            history.push('/category');
        })
        .catch(error => {
            dispatch(showSnackbar({ message: 'product:edit:error', severity: 'error' }));
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        })
    };

    const formDescription = [
        {
            name: 'name',
            type: FORM_FIELD_TYPE_TRANSLATABLE_TEXT,
            label: <Translate value="form:name:label" />,
        },
        {
            name: 'description',
            type: FORM_FIELD_TYPE_TRANSLATABLE_TEXT,
            label: <Translate value="form:description:label" />,
        },
        {
            name: 'price',
            label: <Translate value="form:price:label" />,
        },
        // TODO: category
        {
            name: 'is_visible',
            type: FORM_FIELD_TYPE_SWITCH,
            label: <Translate value="form:is_visible:label" />,
        },
        {
            name: 'photo',
            type: FORM_FIELD_TYPE_IMAGE,
            label: <Translate value="form:photo:label" />,
        },
        {
            type: FORM_FIELD_TYPE_SUBMIT,
            label: <Translate value="common:save" />,
            color: 'white',
            backgroundColor: COLOR_PRIMARY,
            isLoading: false, // TODO
        },
    ];

    return (
        <div className={'bg-white text-center my-5 p-5 mx-auto w-md-50 w-sm-100 border_radius_15'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
            <Typography variant="h3" component="h1" color={'primary'} align={selectedLangWriteFrom}>
                <Translate value={"product:edit:title"} textOnly={true}/>
            </Typography>
            <Form
                key={'product_edit' + product.id}
                initialValue={product}
                fieldDescriptions={formDescription}
                onSubmit={onSubmit}
            />
        </div>
    );
}
