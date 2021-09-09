import React from 'react';
import { useDispatch } from "react-redux";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import Translate from "../common/Translate";
import { showOrderStatusEditDialog } from "../../store/actions";
import { STATUSES_COLORS } from "../../constants";

export default function OrderStatus(props) {
    const dispatch = useDispatch();
    const order = props.order;

    return (
        <Chip
            icon={<FaceIcon />}
            label={<Translate value={'order:status:' + order.status}/>}
            clickable
            onClick={() => dispatch(showOrderStatusEditDialog(order))}
            color={STATUSES_COLORS[order.status]}
            onDelete={()=>console.log('delete')}
            deleteIcon={<DoneIcon />}
        />
    );
}
