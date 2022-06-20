import React  from 'react';
import { useSelector } from 'react-redux'
import { Typography } from "@material-ui/core";

import ProductList from '../cart/ProductList';
import { BOX_SHADOW_CSS_RULE, } from "../../constants";
import TranslateField from "../common/TranslateField";

export default function CategoryShow(props) {
    const category = props.category;
    const products = category.products;

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const titleClassName     = 'text_align_initial d-flex justify-content-' + (selectedLangWriteFrom === 'left' ? 'start' : 'end');
    const flexRowClassName   = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    const paragraphClassName = 'color_white my-2 d-flex ' + flexRowClassName;

    let render;
    if (products.length === 0) {
render = 'no data'; // TODO: implement
    } else {
        render = (
            <div>
                <ProductList products={category?.products} showDelay={props.showDelay} key={'category-show-product-list-' + category.id} />
            </div>
        );
    }

    return (
        <div className={'container-fluid text-center'}>
            <div className={'my-4 p-3'}
                 style={{
                     boxShadow: (selectedLangWriteFrom === 'right' ? '-' : '') + BOX_SHADOW_CSS_RULE,
                     backgroundColor: "#aaaaaa",
                     marginRight: '-15px',
                     marginLeft: '-15px',
                 }}
            >
                <div className="d-inline-block ">

                    <Typography className={titleClassName} variant="h4" component="h1" color="primary" >
                        <TranslateField value={category.name} />
                    </Typography>
                    <Typography className={paragraphClassName} component="p" variant="body1" color="textSecondary" >
                        <TranslateField value={category.description} />
                    </Typography>
                </div>
            </div>
            {render}
        </div>
    );
}
