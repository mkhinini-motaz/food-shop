import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	Button,
	IconButton,
	MenuItem,
	Tooltip,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { attemptClientLogout } from "../store/actions";
import {
	APPBAR_LOGOUT_BUTTON_BG_COLOR,
	APPBAR_LOGOUT_BUTTON_COLOR,
} from "../constants";
import BackToTop from "../components/common/BackToTop";
import I18nSelect from "../components/common/I18nSelect";
import Translate from "../components/common/Translate";

export default function AppBar(props) {
	const dispatch = useDispatch();
	const authShopUser = useSelector((state) => state.AuthReducer.authShopUser);
	const clientIsAuthenticated =
		!!localStorage.getItem("shop_user_access_token") && !!authShopUser.id;

	const styles = {
		menuItem: { textDecoration: "none", fontWeight: 500, fontSize: "1.25rem" },
	};
	if (props.appbarLinkColor) {
		styles.menuItem.color = props.appbarLinkColor;
	}

	let logoutButton = "";
	if (clientIsAuthenticated) {
		logoutButton = (
			<MenuItem className="mr-1">
				<Button
					variant="outlined"
					style={{
						backgroundColor: APPBAR_LOGOUT_BUTTON_BG_COLOR,
						color: APPBAR_LOGOUT_BUTTON_COLOR,
					}}
					onClick={() => dispatch(attemptClientLogout())}
				>
					<ExitToAppIcon className="mr-sm-2" />
					<span className="d-none d-sm-inline">
						<Translate value="common:logout" />
					</span>
				</Button>
			</MenuItem>
		);
	}

	// TODO: translate <Link>
	// TODO: <Translate name="common:logout">
	// TODO: Logo
	// TODO: dynamic badge content from store, show if greater than 0
	// TODO: logout button
	return (
		<BackToTop appbarBackgroundColor={props.appbarBackgroundColor}>
			<MenuItem className="mx-1">
				<Link to="/" style={styles.menuItem}>
					<img width="50px" height="50px" src="/img/ghost2.svg" alt="logo" />
				</Link>
			</MenuItem>

			<MenuItem className="ml-auto menu-item">
				<Tooltip
					title={
						<Translate
							value={clientIsAuthenticated ? "common:profile" : "common:login"}
						/>
					}
				>
					<IconButton
						to={clientIsAuthenticated ? "/profile" : "/login"}
						component={Link}
					>
						<PersonIcon />
					</IconButton>
				</Tooltip>
			</MenuItem>

			<MenuItem className="menu-item">
				<I18nSelect />
			</MenuItem>

			{logoutButton}
		</BackToTop>
	);
}
