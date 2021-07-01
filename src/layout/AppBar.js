import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, MenuItem, Tooltip, } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from '@material-ui/icons/Menu';

import { attemptShopUserLogout, openSideDrawer } from "../store/actions";
import BackToTop from "../components/common/BackToTop";
import I18nSelect from "../components/common/I18nSelect";
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
                <Link to="/category" >
                    <Translate value="common:categories"/>
                </Link>
            </MenuItem>

            <MenuItem className="ml-auto menu-item">
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
				<I18nSelect />
			</MenuItem>

			{logoutButton}
		</BackToTop>
	);
}
