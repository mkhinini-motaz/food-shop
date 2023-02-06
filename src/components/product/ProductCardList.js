import React from 'react';
import { useSelector } from 'react-redux';

import ProductCard from './ProductCard';
import { COMPONENT_SHOW_DELAY } from '../../constants';

export default function ProductCardList(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let productCards = [];
    let showDelay = 0;
    for (let product of props.products) {
        productCards.push((
            <ProductCard key={'product-card-' + product.id} product={product} showDelay={showDelay} />
        ));
        showDelay += COMPONENT_SHOW_DELAY;
    }

    const flexRowClassName = 'd-flex flex-wrap align-content-center flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    return (
        <div className={flexRowClassName}>
            {productCards}
        </div>
    );
}
