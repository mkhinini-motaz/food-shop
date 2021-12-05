import React from "react";
import { MenuItem, Select, IconButton, Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import LanguageIcon from "@material-ui/icons/Language";

import { setLang } from "../../store/actions";
import { availableLangs } from "../../i18n";
import Translate from "./Translate";
import I18nSelect from "./I18nSelect";

export default function StoreI18nSelect(props) {
	const dispatch = useDispatch();
	const selectedLang = useSelector((state) => state.I18nReducer.selectedLang);

	return <I18nSelect selectedLang={selectedLang} onChange={(event) => dispatch(setLang(event.target.value))} />;
}
