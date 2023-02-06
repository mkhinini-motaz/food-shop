import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from '@material-ui/core'
import { BASE_WS_URL, BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COMPONENT_SHOW_DELAY } from "../../constants";

export default function ProductEdit(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    return (
        <Collapse in={isShown}>
            <div>
                //TODO: product edit {props.productId}
            </div>
        </Collapse>
    );
}
