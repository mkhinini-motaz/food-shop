import React from 'react';
import { connect } from  'react-redux'

import '../../App.css';

import { fetchProducts } from '../../store/actions';
import { SHOP_ID } from '../../constants';
import Loader from '../../components/common/Loader';
import ProductList from '../../components/cart/ProductList'

class Cart extends React.Component {
    componentDidMount() {
        this.props.fetchProducts({
            shopId: SHOP_ID,
            productIds: this.props.productsInfo.map(productInfo => productInfo.product_id),
            perPage: this.props.productsInfo.length
        });
    }

    render() {
        if (this.props.productsAreLoading) {
            return (
                <div className={'text-center my-3 mx-auto w-md-75 w-sm-100'}>
                    <Loader />
                </div>
            );
        }

        if (! this.props.productsAreLoading && this.props.products.length === 0) {
            return 'no data'; // TODO: implement
        }

        return (
            <div className={'text-center my-3 mx-auto w-md-75 w-sm-100'}>
                <ProductList products={this.props.products} productsInfo={this.props.productsInfo} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productsInfo: state.CartReducer.products,
        products: state.ProductReducer.products.data,
        currentPage: state.ProductReducer.products.current_page,
        lastPage: state.ProductReducer.products.last_page,
        productsAreLoading: state.ProductReducer.productsAreLoading,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProducts: (payload) => dispatch(fetchProducts(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
