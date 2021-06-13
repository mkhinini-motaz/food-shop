import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, MenuItem, Tooltip, } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { attemptShopUserLogout } from "../store/actions";
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
			<MenuItem className="mx-1">
				<Link to="/" style={styles.logoLink}>
					<img width="50px" height="50px" src="/img/ghost2.svg" alt="logo" />
				</Link>
			</MenuItem>

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
