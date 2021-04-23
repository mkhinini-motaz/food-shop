import React from 'react';
import { useSelector } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';

import { BOX_SHADOW_CSS_RULE } from "../../constants";

export default function AdditionalNote(props) {
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    setTimeout(() => { setIsShown(previousIsShown => true); }, 500 + props.showDelay);

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white py-2 px-3 text-left ' + (props.withMargins !== false ? 'my-2' : 'my-0')}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Typography variant="body1" color="textSecondary" component="span">
                    {props.additionalNote}
                </Typography>
            </div>
        </Collapse>
    );
}
