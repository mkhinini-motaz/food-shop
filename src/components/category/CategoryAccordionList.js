import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from '../../constants';
import CategoryAccordion from "./CategoryAccordion";
import { Button } from "@material-ui/core";

export default function CategoryAccordionList(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let categories = [];
    let showDelay = props.showDelay || 0;
    const [isExpandedList, setIsExpandedList] = useState({});

    useEffect(() => {
        const isExpanded = {};
        for (let category of props.categories) {
            isExpanded[category.id] = true;
        }

        setIsExpandedList(isExpanded);
    }, []);

    for (let category of props.categories) {
        categories.push((
            <CategoryAccordion key={'category-card-' + category.id}
                               category={category}
                               showDelay={showDelay}
                               isExpanded={isExpandedList[category.id]}
                               onExpand={() => {
                                   setIsExpandedList({ ...isExpandedList, [category.id]: !isExpandedList[category.id] })
                               }}
            />
        ));
        showDelay += category.products.length * COMPONENT_SHOW_DELAY;
    }

    const flexRowClassName = 'my-2 px-2 row flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    return (
        <div className={flexRowClassName}>
            {categories}
        </div>
    );
}
