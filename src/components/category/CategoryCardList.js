import React from 'react';
import { useSelector } from 'react-redux'

import CategoryCard from './CategoryCard';
import { COMPONENT_SHOW_DELAY } from '../../constants';

export default function CategoryCardList(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let categoryCards = [];
    let showDelay = 0;

    for (let category of props.categories) {
        categoryCards.push((
            <CategoryCard key={'category-card-' + category.id} category={category} showDelay={showDelay} />
        ));
        showDelay += COMPONENT_SHOW_DELAY;
    }

    const flexRowClassName = 'd-flex flex-wrap justify-content-center flex-row' +
        (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    return (
        <div className={flexRowClassName}>
            {categoryCards}
        </div>
    );
}
