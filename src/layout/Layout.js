import React from "react";
import { connect } from "react-redux";

import AppBar from "./AppBar";
import Footer from "./Footer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Snackbar from "../components/common/Snackbar";
import { COLOR_PRIMARY } from "../constants";
import OrderDialog from "../components/order/OrderDialog";

class Layout extends React.Component {
	render() {
		const {
			confirmDialogProps,
			orderDialogProps,
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

				<OrderDialog
					order={orderDialogProps.order}
					isVisible={orderDialogProps.isVisible}
					onConfirm={orderDialogProps.onConfirm}
					onCancel={orderDialogProps.onCancel}
				/>

				<Snackbar />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const confirmDialogProps = state.ConfirmDialogReducer;
	const orderDialogProps = state.OrderDialogReducer;

	return {
		confirmDialogProps,
		orderDialogProps,
		selectedLang: state.I18nReducer.selectedLang,
	};
};
export default connect(mapStateToProps)(Layout);
