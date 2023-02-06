import React from "react";
import { connect } from "react-redux";

import { fetchCategories } from "../../store/actions";
import Loader from "../../components/common/Loader";
import CategoryAccordionList from "../../components/category/CategoryAccordionList";

class CategoryIndex extends React.Component {
	componentDidMount() {
		this.props.fetchCategories({ orderBy: 'order', orderDirection: 'asc' });
	}

	render() {
		let render;

		if (this.props.categoriesAreLoading) {
			render = <Loader />;
		} else if (
			!this.props.categoriesAreLoading &&
			this.props.categories.length === 0
		) {
			render = "no data"; // TODO: implement
		} else {
			render = <CategoryAccordionList categories={this.props.categories} />;
		}
		return <div className="text-center">{render}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.CategoryReducer.categories.data,
		categoriesAreLoading: state.CategoryReducer.categoriesAreLoading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchCategories: ({ page, perPage, orderBy, orderDirection }) =>
			dispatch(
				fetchCategories({ page, perPage, orderBy, orderDirection })
			),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex);
