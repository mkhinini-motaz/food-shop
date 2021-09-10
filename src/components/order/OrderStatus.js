import React from 'react';
import {Checkbox, Chip, Typography,} from '@material-ui/core';

import Translate from "../common/Translate";
import { STATUSES_COLORS } from "../../constants";
import {useSelector} from "react-redux";

export default function OrderStatus(props) {
    const order      = props.order;
    const onClick    = props.onClick || (() => {});
    const className  = props.className;
    const withCheck  = !! props.withCheck;
    const isSelected = !! props.isSelected;

    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : ' ';

    return (
        <div className={'my-1 d-inline-flex justify-content-between' + flexRowClassName + className}>
            <Chip
                className="my-2 p-2 h-auto"
                label={
                    <Typography variant="body1" component="span" className="white_space_pre_wrap">
                        <Translate value={'order:status:' + order.status}/>
                    </Typography>
                }
                clickable
                onClick={onClick}
                style={{backgroundColor: STATUSES_COLORS[order.status]}}
            />
            {! withCheck ? '' :
                <Checkbox
                    onChange={onClick}
                    color="primary"
                    checked={isSelected}
                />
            }
        </div>
    );
}
