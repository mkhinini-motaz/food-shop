import React from "react";
import { connect } from "react-redux";

import AppBar from "./AppBar";
import Footer from "./Footer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import ProductCreateDialog from "../components/product/ProductCreateDialog";
import ProductDeleteDialog from "../components/product/ProductDeleteDialog";
import { COLOR_PRIMARY } from "../constants";

class Layout extends React.Component {
	render() {
		const {
			confirmDialogProps,
			productCreateDialogProps,
			productDeleteDialogProps,
			cartProps,
		} = this.props;
		const styles = {
			mainDiv: {
				paddingTop: "3vh",
			},
		};
		return (
			<div
				className={
					"main_layout_container main_layout_container_" +
					this.props.selectedLang
				}
			>
				<AppBar
					appbarBackgroundColor={COLOR_PRIMARY}
					appbarLinkColor="#ffffff"
					cartCount={cartProps.cartCount}
				/>
				<div className="mx-auto w-md-75 w-sm-100" style={styles.mainDiv}>
					<div className="container-fluid">{this.props.children}</div>
				</div>
				<Footer />

				<ConfirmDialog
					isVisible={confirmDialogProps.isVisible}
					title={confirmDialogProps.title}
					content={confirmDialogProps.content}
					onConfirm={confirmDialogProps.onConfirm}
					onCancel={confirmDialogProps.onCancel}
				/>

				<ProductCreateDialog
					product={productCreateDialogProps.product}
					isVisible={productCreateDialogProps.isVisible}
					onConfirm={productCreateDialogProps.onConfirm}
					onCancel={productCreateDialogProps.onCancel}
				/>

				<ProductDeleteDialog
					product={productDeleteDialogProps.product}
					isVisible={productDeleteDialogProps.isVisible}
					onConfirm={productDeleteDialogProps.onConfirm}
					onCancel={productDeleteDialogProps.onCancel}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let cartCount = state.CartReducer.products;
	if (cartCount.length > 0) {
		cartCount = cartCount
			.map((productInfo) => productInfo.product_count)
			.reduce((value1, value2) => value1 + value2, 0);
	} else {
		cartCount = 0;
	}

	const confirmDialogProps = state.ConfirmDialogReducer;
	const productCreateDialogProps = state.ProductDialogReducer.create;
	const productDeleteDialogProps = state.ProductDialogReducer.delete;

	return {
		confirmDialogProps,
		productCreateDialogProps,
		productDeleteDialogProps,
		cartProps: { cartCount },
		selectedLang: state.I18nReducer.selectedLang,
	};
};
export default connect(mapStateToProps)(Layout);
