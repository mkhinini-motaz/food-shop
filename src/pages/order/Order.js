import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Divider } from '@material-ui/core';

import { BASE_BACKEND_URL, COLOR_PRIMARY, COMPONENT_SHOW_DELAY, IMAGE_WITH_TEXT_TINT } from "../../constants";
import { fetchCategories } from "../../store/actions";
import TranslateField from "../../components/common/TranslateField";
import Product from "../../components/order/Product";
import Category from "../../components/order/Category";
import CartContents from "../../components/cart/CartContents";
import ClientInfo from "../../components/cart/ClientInfo";

export default function Order(props) {
    const dispatch = useDispatch();

    const productsInfo = useSelector(state => state.CartReducer.products);
    const selectedProductIds = productsInfo.map(productInfo => productInfo.product_id)
    const productsAreLoading = useSelector(state => state.ProductReducer.productsAreLoading);
    const [ isShown, setIsShown ] = React.useState(false);
    const [ selectedCategoryId, setSelectedCategoryId ] = React.useState(null);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    useEffect(() => {
        dispatch(fetchCategories({ orderBy: 'order', orderDirection: 'asc' }));
    }, [dispatch]);

    const categoriesAreLoading = useSelector(state => state.CategoryReducer.categoriesAreLoading);
    const categories = useSelector(state => state.CategoryReducer.categories.data);
    const products = categories.map(category =>
        category.products.filter(product =>
            -1 !== selectedProductIds.indexOf(product.id)
        ).map(product => ({ ...product, category }))
    ).flat()

    const selectedCategory = categories.find(category => category.id === selectedCategoryId);

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);
    return (
        <Collapse in={isShown}>
            <div>
                <div className="row">
                    {categories.map(category => <div key={'category_order_' + category.id}  className={'col-6 col-sm-4 col-md-2 '}>
                        <Category category={category} isSelected={selectedCategoryId === category.id} onClick={() => setSelectedCategoryId(category.id)} />
                    </div>)}
                </div>

                <div className={'my-4'}><Divider /></div>

                {! selectedCategory ? '' : <>
                    <div className={"row px-3 text-white"}>
                        {selectedCategory?.products.map(product => <Product key={'product_order_' + product.id} product={product} />)}
                    </div>

                    <div className={'my-4'}><Divider /></div>
                </>}
                <div className={"row px-3 flex-column-reverse flex-sm-row"}>
                    <div className={"col-12 col-sm-6"}>
                        <CartContents products={products} productsInfo={productsInfo} />
                    </div>
                    <div className={"col-12 col-sm-6"}>
                        <ClientInfo />
                    </div>
                </div>
            </div>
        </Collapse>
    );
}
