import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from '../../constants';
import CategoryAccordion from "./CategoryAccordion";
import { debounce } from "../../utils";
import TextField from "../common/form/TextField";
import { fetchCategories } from "../../store/actions";

export default function CategoryAccordionList(props) {
    const dispatch = useDispatch();
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    let categories = [];
    let showDelay = props.showDelay || 0;
    const [isExpandedList, setIsExpandedList] = useState({});

    useEffect(() => {
        const isExpanded = {};
        for (let category of props.categories) {
            isExpanded[category.id] = false;
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

    const [searchPhrase, setSearchPhrase] = useState("");
    const debouncedOnChange = debounce('debounce_search_categories', (search) => { dispatch(fetchCategories({ search })) }, 700);

    return (
        <div>
            <div className={"bg-white p-2 m-2 border_radius_15 "} style={{ boxShadow: BOX_SHADOW_CSS_RULE }} >
                <TextField name={'search'} label={'search'} value={searchPhrase} required={false} onChange={(event) => {
                    setSearchPhrase(event.target.value);
                    debouncedOnChange(event.target.value);
                }} />
            </div>

            <div className={flexRowClassName}>
                {categories}
            </div>
        </div>
    );
}
