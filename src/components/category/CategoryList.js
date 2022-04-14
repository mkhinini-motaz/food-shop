import React from 'react';
import { useSelector } from 'react-redux'

import CategoryShow from './CategoryShow';
import { COMPONENT_SHOW_DELAY } from '../../constants';

export default function CategoryList(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let categoryCards = [];
    let showDelay = props.showDelay || 0;

    for (let category of props.categories) {
        categoryCards.push((
            <CategoryShow key={'category-card-' + category.id} category={category} showDelay={showDelay} />
        ));
        showDelay += category.products.length * COMPONENT_SHOW_DELAY;
    }

    const flexRowClassName = 'd-flex flex-wrap justify-content-center flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    return (
        <div className={flexRowClassName}>
            {categoryCards}
        </div>
    );
}
