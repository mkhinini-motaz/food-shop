import React from 'react';
import { Collapse } from '@material-ui/core';
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from "../constants";
import { useDispatch, useSelector} from "react-redux";
import GoogleMap from "../components/common/GoogleMap";
import { getCurrentOrders } from "../store/actions";

export default function Home(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);
    React.useEffect(() => dispatch(getCurrentOrders({})), []);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders.data);

    return (
        <Collapse in={isShown}>
            <div className={'bg-white my-2 p-2'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <GoogleMap height="70vh" orders={currentOrders} />
            </div>
        </Collapse>
    );
}
