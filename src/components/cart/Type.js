import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Typography, Collapse, MenuItem, Select, FormControl } from '@material-ui/core';

import Translate from "../common/Translate";
import { BOX_SHADOW_CSS_RULE, TYPES } from "../../constants";
import { setType } from "../../store/actions";

export default function Type(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    const type = useSelector(state => state.CartReducer.type);
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
                <Typography className={"mx-2 align-self-center"}>
                    <span><Translate value="order:type" /></span>
                </Typography>
                <FormControl variant="outlined" >
                    <Select value={type}
                            onChange={(event) => dispatch(setType(event.target.value))}
                    >
                        {Object.entries(TYPES).map((value) =>
                            <MenuItem value={value[0]} key={"order_source_" + value[0] + "_" + value[1]}>
                                <Translate value={value[1]}/>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        </Collapse>
    );
}
