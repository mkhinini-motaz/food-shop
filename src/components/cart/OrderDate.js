import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Collapse, FormControlLabel, Switch } from "@material-ui/core";

import Translate from "../common/Translate";
import { setOrderTimestamp } from "../../store/actions";
import { BOX_SHADOW_CSS_RULE } from '../../constants';

export default function OrderDate(props) {
    const dispatch = useDispatch();
    const [ orderIsDeferred, setOrderIsDeferred ] = React.useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    const [ isShown, setIsShown ] = React.useState(false);

    useEffect(() => {
        dispatch(setOrderTimestamp(null)); // TODO: clean up cart logic
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 py-2 px-3 text-left border_radius_15'}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={(event) => setOrderIsDeferred(event.target.checked)}
                                color="primary"
                                checked={orderIsDeferred}
                            />
                        }
                        label={<Translate value={orderIsDeferred ? "order:order_later" : "order:order_now"}/>}
                    />
                    {! orderIsDeferred ? '' :
                        <DateTimePicker
                            label={<Translate value="order:date" />}
                            inputVariant="standard"
                            value={selectedDate}
                            ampm={false}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            onChange={(newValue) => {
                                // TODO: refactor duplicate action
                                handleDateChange(newValue);
                                dispatch(setOrderTimestamp(newValue));
                            }}
                        />
                    }
                </MuiPickersUtilsProvider>
            </div>
        </Collapse>
    );
}
