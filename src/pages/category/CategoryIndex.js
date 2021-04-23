import React from "react";
import { connect } from "react-redux";

import { fetchCategories } from "../../store/actions";
import Loader from "../../components/common/Loader";
import CategoryCardList from "../../components/category/CategoryCardList";

class Home extends React.Component {
	componentDidMount() {
		this.props.fetchCategories({});
	}

	render() {
		let render = [];

		if (this.props.categoriesAreLoading) {
			render = <Loader />;
		} else if (
			!this.props.categoriesAreLoading &&
			this.props.categories.length === 0
		) {
			render = "no data"; // TODO: implement
		} else {
			render = <CategoryCardList categories={this.props.categories} />;
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
		fetchCategories: ({ shopId, page, perPage, orderBy, orderDirection }) =>
			dispatch(
				fetchCategories({ shopId, page, perPage, orderBy, orderDirection })
			),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
