import React from 'react';
import { Divider, Drawer, IconButton, Typography, } from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { closeSideDrawer } from "../store/actions/sideDrawer";
import { COLOR_PRIMARY } from "../constants";
import Translate from "../components/common/Translate";
import { attemptShopUserLogout } from "../store/actions";

export default function SideDrawer(props) {
	const currentPath = window.location.pathname;
	const dispatch = useDispatch();
	const isOpen = useSelector(state => state.SideDrawerReducer.isOpen);
	const authShopUser = useSelector(state => state.AuthReducer.authShopUser);
	const clientIsAuthenticated = !!localStorage.getItem("shop_user_access_token") && !!authShopUser.id;
	const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

	const paddingRule = selectedLangWriteFrom === 'left' ? 'pr-4' : 'pl-4 text-right';
	const flexRowRule = selectedLangWriteFrom === 'left' ? '' : 'd-flex flex-row-reverse align-items-center';
	const logoutFlexRowRule = selectedLangWriteFrom === 'left' ? '' : 'd-flex flex-row-reverse align-items-center';
	const activeLinkStyle = { backgroundColor: COLOR_PRIMARY + '77' };

	let logoutLink = '';
	let categoriesLink = '';
	if (clientIsAuthenticated) {
		logoutLink = (
			<div className={paddingRule + ' ' + logoutFlexRowRule} onClick={() => dispatch(attemptShopUserLogout())}>
				<IconButton><ExitToAppIcon /></IconButton>
				<Typography variant="body1" color="textPrimary" component="span">
					<Translate value="common:logout" />
				</Typography>
			</div>
		);

		categoriesLink = (
            <div className={'mt-3 ' + paddingRule} style={currentPath === '/category' ? activeLinkStyle : {}}>
                <Link to="/category" className={flexRowRule}>
                    <IconButton><FastfoodIcon /></IconButton>
                    <Typography variant="body1" color="textPrimary" component="span">
                        <Translate value="common:categories" />
                    </Typography>
                </Link>
            </div>
        );
	}

	const list = () => (
		<div
			role="presentation"
			onClick={() => dispatch(closeSideDrawer())}
			onKeyDown={() => dispatch(closeSideDrawer())}
			className="side_drawer"
		>
			<div className="p-1 text-center MuiPaper-elevation4 MuiToolbar-regular" style={{ backgroundColor: COLOR_PRIMARY }}>
				<Link to="/">
					<img width="50px" height="50px" src="/img/ghost2.svg" alt="logo" />
				</Link>
			</div>
			<Divider />

			<div className={'mt-3 ' + paddingRule} style={currentPath === '/' ? activeLinkStyle : {}}>
				<Link to="/" className={flexRowRule}>
					<IconButton><Home /></IconButton>
					<Typography variant="body1" color="textPrimary" component="span">
						<Translate value="common:home" />
					</Typography>
				</Link>
			</div>

			<div className={paddingRule} style={currentPath === (clientIsAuthenticated ? "/profile" : "/login") ? activeLinkStyle : {}}>
				<Link to={clientIsAuthenticated ? "/profile" : "/login"} className={flexRowRule}>
					<IconButton><PersonIcon /></IconButton>
					<Typography variant="body1" color="textPrimary" component="span">
						<Translate value={'common:' + (clientIsAuthenticated ? "profile" : "login")} />
					</Typography>
				</Link>
			</div>

			{categoriesLink}

			<div className={paddingRule} style={currentPath === (clientIsAuthenticated ? "/settings" : "/login") ? activeLinkStyle : {}}>
				<Link to={clientIsAuthenticated ? "/settings" : "/login"} className={flexRowRule}>
					<IconButton><SettingsIcon /></IconButton>
					<Typography variant="body1" color="textPrimary" component="span">
						<Translate value={'common:' + (clientIsAuthenticated ? "settings" : "login")} />
					</Typography>
				</Link>
			</div>

			{logoutLink}
		</div>
	);

	return (
		<div>
			<Drawer anchor={selectedLangWriteFrom} open={isOpen} onClose={() => dispatch(closeSideDrawer())}>
				{list()}
			</Drawer>
		</div>
	);
}
