import React from 'react';
import { Divider, Drawer, IconButton, Typography, Badge, } from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
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
	const authClient = useSelector(state => state.AuthReducer.authClient);
	const clientIsAuthenticated = !!localStorage.getItem("client_access_token") && !!authClient.id;
	const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
	const paddingRule = selectedLangWriteFrom === 'left' ? 'pr-4' : 'pl-4 text-right';
	const flexRowRule = selectedLangWriteFrom === 'left' ? '' : 'd-flex flex-row-reverse align-items-center';
	const logoutFlexRowRule = selectedLangWriteFrom === 'left' ? '' : 'd-flex flex-row-reverse align-items-center';
	const activeLinkStyle = { backgroundColor: COLOR_PRIMARY + '77' };

	let logoutLink = '';
	let registerLink = '';
	let loyaltyProgramLink = '';
	if (clientIsAuthenticated) {
		logoutLink = (
			<div className={paddingRule + ' ' + logoutFlexRowRule} onClick={() => dispatch(attemptShopUserLogout())}>
				<IconButton><ExitToAppIcon /></IconButton>
				<Typography variant="body1" color="textPrimary" component="span">
					<Translate value="common:logout" />
				</Typography>
			</div>
		);
		loyaltyProgramLink = (
            <div className={paddingRule} style={currentPath === '/loyalty' ? activeLinkStyle : {}} >
                <Link to="/loyalty" className={flexRowRule}>
                    <IconButton><LoyaltyIcon /></IconButton>
                    <Typography variant="body1" color="textPrimary" component="span">
                        <Translate value="common:loyalty_program" />
                    </Typography>
                </Link>
            </div>
        );
	} else {
		registerLink = (
			<div className={paddingRule} style={currentPath === '/register' ? activeLinkStyle : {}}>
				<Link to="/register" className={flexRowRule}>
					<IconButton><PersonAddIcon /></IconButton>
					<Typography variant="body1" color="textPrimary" component="span">
						<Translate value="common:register" />
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
					<img width="50px" height="50px" src="/img/ghost1.svg" alt="logo" />
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

			<div className={paddingRule} style={currentPath === '/cart' ? activeLinkStyle : {}}>
				<Link to="/cart" className={flexRowRule}>
					<IconButton>
						<ShoppingCart />
						{! props.cartCount ? "" : (
							<Badge
								badgeContent={props.cartCount}
								color="secondary"
								style={{ [selectedLangWriteFrom]: "3px" }}
							/>
						)}
					</IconButton>
					<Typography variant="body1" color="textPrimary" component="span">
						<Translate value="common:cart" />
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
			{registerLink}
			{loyaltyProgramLink}
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
