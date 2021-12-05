import React from "react";
import { MenuItem, Select, IconButton, Tooltip } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import { availableLangs } from "../../i18n";
import Translate from "./Translate";

export default function I18nSelect(props) {
	const [isSelectOpen, setIsSelectOpen] = React.useState(false);
	const { selectedLang, onChange } = props;

	let menuItems = [];
	for (let lang in availableLangs) {
		menuItems.push(
			<MenuItem key={"i18n-select-item-" + lang + Math.random()} value={lang}>
				<Translate value={"lang:" + lang} />
			</MenuItem>
		);
	}

	return (
		<>
			<Tooltip title={<Translate value="common:language" />} >
				<IconButton
					variant="contained"
					color="secondary"
					onClick={() => setIsSelectOpen(true)}
				>
					<LanguageIcon />
					<span className="d-none d-sm-inline language-abv">
						{selectedLang}
					</span>
				</IconButton>
			</Tooltip>
			<Select
				className="text-white position-absolute invisible"
				style={{ left: 0, right: 0 }}
				IconComponent={() => ""}
				renderValue={() => ""}
				inputProps={{ className: "invisible" }}
				value={selectedLang}
				open={isSelectOpen}
				onChange={onChange}
				onClose={() => setIsSelectOpen(false)}
			>
				{menuItems}
			</Select>
		</>
	);
}
