import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from '@material-ui/core';

import Translate from "../common/Translate";
import Form from "../common/form/Form";
import { BOX_SHADOW_CSS_RULE, CART_ADDITIONAL_NOTE_CHANGE_TIMEOUT_DELAY, } from "../../constants";
import { setAdditionalNote } from "../../store/actions";
import TextField from "../common/form/TextField";

export default function AdditionalNote(props) {
    const dispatch = useDispatch();
    const [ timeoutId, setTimeoutId ] = React.useState(0);
    const [ isShown, setIsShown ] = React.useState(false);
    const additionalNote = useSelector(state => state.CartReducer.additionalNote);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 py-2 px-3 text-left border_radius_15'}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <TextField value={additionalNote}
                           label={<Translate value="cart:additional_note:label" />}
                           onChange={(event) => dispatch(setAdditionalNote(event.target.value))}
                           multiline
                           required={false}/>
            </div>
        </Collapse>
    );
}
