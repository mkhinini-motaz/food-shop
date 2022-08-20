import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, MenuItem, Tooltip, } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from '@material-ui/icons/Menu';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Home } from "@material-ui/icons";

import { attemptShopUserLogout, openSideDrawer } from "../store/actions";
import BackToTop from "../components/common/BackToTop";
import StoreI18nSelect from "../components/common/StoreI18nSelect";
import Translate from "../components/common/Translate";

export default function AppBar(props) {
	const dispatch = useDispatch();
	const authShopUser = useSelector((state) => state.AuthReducer.authShopUser);
	const shopUserIsAuthenticated =
		!!localStorage.getItem("shop_user_access_token") && !!authShopUser.id;

	const styles = { logoLink: { textDecoration: "none", fontWeight: 500, fontSize: "1.25rem" }, };
	if (props.appbarLinkColor) {
		styles.logoLink.color = props.appbarLinkColor;
	}

	let logoutButton = "";
	if (shopUserIsAuthenticated) {
		logoutButton = (
			<MenuItem className="mx-1 menu-item">
				<Tooltip title={<Translate value="common:logout" />} >
					<IconButton
						variant="contained"
						onClick={() => dispatch(attemptShopUserLogout())} /* TODO: change to attemptShopUserLogout */
					>
						<ExitToAppIcon />
					</IconButton>
				</Tooltip>
			</MenuItem>
		);
	}

	return (
		<BackToTop appbarBackgroundColor={props.appbarBackgroundColor}>
			<IconButton
				aria-label="open drawer"
				onClick={() => dispatch(openSideDrawer())}
				variant="contained"
				edge="start"
				className="color_white"
			>
				<MenuIcon />
			</IconButton>

			<MenuItem className="ml-auto menu-item">
				<Tooltip title={<Translate value={shopUserIsAuthenticated ? "order:cards" : "common:login"} />} >
					<IconButton
						to={shopUserIsAuthenticated ? "/" : "/login"}
						component={Link}
					>
						<Home />
					</IconButton>
				</Tooltip>
			</MenuItem>

            <MenuItem className="menu-item">
				<Tooltip title={<Translate value={shopUserIsAuthenticated ? "order:order" : "common:login"} />} >
					<IconButton
						to={shopUserIsAuthenticated ? "/order" : "/login"}
						component={Link}
					>
						<ShoppingCart />
					</IconButton>
				</Tooltip>
			</MenuItem>

            <MenuItem className="menu-item">
				<Tooltip title={<Translate value={shopUserIsAuthenticated ? "order:overview" : "common:login"} />} >
					<IconButton
						to={shopUserIsAuthenticated ? "/order/overview" : "/login"}
						component={Link}
					>
						<AccountBalanceWalletIcon />
					</IconButton>
				</Tooltip>
			</MenuItem>

            <MenuItem className="menu-item">
				<Tooltip title={<Translate value={shopUserIsAuthenticated ? "common:profile" : "common:login"} />} >
					<IconButton
						to={shopUserIsAuthenticated ? "/profile" : "/login"}
						component={Link}
					>
						<PersonIcon />
					</IconButton>
				</Tooltip>
			</MenuItem>

			<MenuItem className="menu-item">
				<StoreI18nSelect />
			</MenuItem>

			{logoutButton}
		</BackToTop>
	);
}
