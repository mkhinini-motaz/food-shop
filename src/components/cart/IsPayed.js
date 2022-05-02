import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Collapse, FormControlLabel } from '@material-ui/core';

import Translate from "../common/Translate";
import { BOX_SHADOW_CSS_RULE, CART_ADDITIONAL_NOTE_CHANGE_TIMEOUT_DELAY, } from "../../constants";
import { setAdditionalNote, setIsPayed } from "../../store/actions";

export default function IsPayed(props) {
    const dispatch = useDispatch();
    const [ timeoutId, setTimeoutId ] = React.useState(0);
    const [ isShown, setIsShown ] = React.useState(false);
    const isPayed = useSelector(state => state.CartReducer.isPayed);
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
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(event) => dispatch(setIsPayed(event.target.checked))}
                            color="primary"
                            checked={isPayed}
                        />
                    }
                    label={<Translate value={isPayed ? "order:is_payed" : "order:is_not_payed"}/>}
                />

            </div>
        </Collapse>
    );
}
