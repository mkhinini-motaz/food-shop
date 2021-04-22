import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import Card from '../common/Card';
import { BASE_BACKEND_URL } from '../../constants'
import TranslateField from "../common/TranslateField";

export default function CategoryCard(props) {
    const history = useHistory();

    return (
        <Card
            title={<TranslateField value={props.category} field="name" />}
            image={BASE_BACKEND_URL + props.category.photo}
            onClick={() => history.push('/category/' + props.category.id + '/product') }
            showDelay={props.showDelay}
        >
            <Typography variant="body1" color="textSecondary" component="p">
                <TranslateField value={props.category} field="description" />
            </Typography>
        </Card>
    );
}
