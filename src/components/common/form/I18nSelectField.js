import React from "react";
import I18nSelect from "../I18nSelect";
import Translate from "../Translate";
import { MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function I18nSelectField(props) {
	const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

	return (
		<div className={"text-" + selectedLangWriteFrom}>
			<div >
				<Translate value={"menu:language"} />
			</div>
			<div className={'d-inline mx-2'}>
				{! props.value ? '' : <Translate value={"lang:" + props.value} />}
			</div>
			<I18nSelect {...props} />
		</div>
	);
}
