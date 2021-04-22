import React from 'react';
import { Collapse } from '@material-ui/core';
import { BOX_SHADOW_CSS_RULE } from "../../constants";
import LeafletMapField from "../common/form/LeafletMapField";
import {setCartAddress} from "../../store/actions";
import { useDispatch } from "react-redux";
import GoogleMapField from "../common/form/GoogleMapField";

export default function Map(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);
    const onChange = address => dispatch(setCartAddress(address));

    return (
        <Collapse in={isShown}>
            <div className={'bg-white my-2 p-2'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <GoogleMapField height="40vh" />
            </div>
        </Collapse>
    );
}
