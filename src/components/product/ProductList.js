import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from "@material-ui/core";
import { COMPONENT_SHOW_DELAY } from '../../constants';
import Product from "./Product";

export default function ProductList(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let products = [];
    let showDelay = 0;
    for (let product of props.products) {
        products.push((
            <Product key={'product-card-' + product.id} product={product} showDelay={showDelay} />
        ));
        products.push((
            <Divider className="m-2" style={{ width: 'calc(100% - 1rem)' }} key={'product-divider-card-' + product.id} />
        ));
        showDelay += COMPONENT_SHOW_DELAY;
    }
    products.pop();

    const flexRowClassName = 'row flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    return (
        <div className={flexRowClassName}>
            {products}
        </div>
    );
}
