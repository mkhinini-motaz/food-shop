import React from "react";
import { Button, MenuItem, Select, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import LanguageIcon from "@material-ui/icons/Language";

import { setLang } from "../../store/actions";
import { availableLangs } from "../../i18n";
import Translate from "./Translate";

export default function I18nSelect(props) {
	const dispatch = useDispatch();
	const [isSelectOpen, setIsSelectOpen] = React.useState(false);
	const selectedLang = useSelector((state) => state.I18nReducer.selectedLang);

	let menuItems = [];
	for (let lang in availableLangs) {
		menuItems.push(
			<MenuItem key={"i18n-select-item-" + lang} value={lang}>
				<Translate value={"lang:" + lang} />
			</MenuItem>
		);
	}

	return (
		<div className="">
			<IconButton
				variant="contained"
				color="secondary"
				onClick={() => setIsSelectOpen(true)}
			>
				<LanguageIcon />
				<span className="d-none d-sm-inline language-abv">
					<Translate value={selectedLang} />
				</span>
			</IconButton>
			<Select
				id="i18n-select-field"
				labelId="i18n-select-label"
				className="text-white position-absolute invisible"
				style={{ left: 0, right: 0 }}
				IconComponent={() => ""}
				renderValue={() => ""}
				inputProps={{ className: "invisible" }}
				value={selectedLang}
				open={isSelectOpen}
				onChange={(event) => dispatch(setLang(event.target.value))}
				onClose={() => setIsSelectOpen(false)}
			>
				{menuItems}
			</Select>
		</div>
	);
}
