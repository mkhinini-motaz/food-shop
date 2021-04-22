import React from 'react';
import { connect } from 'react-redux'

import { fetchProducts } from '../../../store/actions'
import ProductCardList from '../../../components/product/ProductCardList';
import Loader from '../../../components/common/Loader';
import Pagination from '../../../components/common/Pagination';

class CategoryShow extends React.Component {
    componentDidMount() {
        const { categoryId } = this.props;

        this.props.fetchProducts({ categoryId });
    }

    renderContent() {
        const { categoryId } = this.props;

        if (this.props.productsAreLoading) {
            return <Loader />;
        }
        if (!this.props.productsAreLoading && this.props.products.length === 0) {
return 'no data'; // TODO: implement
        }
        return (
            <div>
                <ProductCardList products={this.props.products}  key={'category-show-product-card-list'} />
                <Pagination currentPage={this.props.currentPage} lastPage={this.props.lastPage} onChange={(event, page) => this.props.fetchProducts({ categoryId, page })} />
            </div>
        );
    }

    render() {
        return (
            <div className={'text-center'}>
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryShow);
