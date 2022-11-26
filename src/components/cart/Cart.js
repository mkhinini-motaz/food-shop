import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Divider } from '@material-ui/core';

import { COMPONENT_SHOW_DELAY } from "../../constants";
import { fetchCategories } from "../../store/actions";
import Product from "../../components/order/Product";
import Category from "../../components/order/Category";
import CartContents from "../../components/cart/CartContents";
import ClientInfo from "../../components/cart/ClientInfo";
import SubmitOrder from "./SubmitOrder";

export default function Cart(props) {
    const dispatch = useDispatch();

    const productsInfo = useSelector(state => state.CartReducer.products);
    const selectedProductIds = productsInfo.map(productInfo => productInfo.product_id)
    const [ isShown, setIsShown ] = React.useState(false);
    const [ selectedCategoryId, setSelectedCategoryId ] = React.useState(null);

    useEffect(() => {
        dispatch(fetchCategories({ orderBy: 'order', orderDirection: 'asc' }));
        const timeoutId = setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    const categories = useSelector(state => state.CategoryReducer.categories.data);
    const products = categories.map(category =>
        category.products.filter(product =>
            -1 !== selectedProductIds.indexOf(product.id)
        ).map(product => ({ ...product, category }))
    ).flat()

    const selectedCategory = categories.find(category => category.id === selectedCategoryId);

    return (
        <Collapse in={isShown}>
            <div>
                <div className="row">
                    {categories.map(category => <div key={'category_order_' + category.id}  className={'col-6 col-sm-4 col-md-2 '}>
                        <Category category={category} isSelected={selectedCategoryId === category.id}
                                  onClick={() => setSelectedCategoryId(selectedCategoryId !== category.id ? category.id : null)}
                        />
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
                        <SubmitOrder orderId={props.orderId} showDelay={COMPONENT_SHOW_DELAY} />
                    </div>
                    <div className={"col-12 col-sm-6"}>
                        <ClientInfo />
                    </div>
                </div>
            </div>
        </Collapse>
    );
}
