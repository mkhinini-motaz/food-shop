import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Typography, Collapse, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';

import Translate from "../common/Translate";
import { BOX_SHADOW_CSS_RULE, SOURCES, TYPES } from "../../constants";
import { setSource } from "../../store/actions";

export default function Source(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    const source = useSelector(state => state.CartReducer.source);
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
                <Typography gutterBottom className={"mx-2 align-self-center"}>
                    <Translate value="order:source" />
                </Typography>
                <FormControl variant="outlined" >
                    <Select value={source}
                            onChange={(event) => dispatch(setSource(event.target.value))}
                    >
                        {Object.entries(SOURCES).map((value) =>
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
