import React from 'react';
import { Collapse } from '@material-ui/core';
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import GoogleMap from "../components/common/GoogleMap";
import Order from "../components/order/Order";
import { getCurrentOrders } from "../store/actions";

export default function Home(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({})), []);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders.data);

    return (
        <Collapse in={isShown}>
            <div className="row">
                <div className="my-2 col-12 col-sm-8 " >
                    <div className="bg-white p-2 border_radius_15" style={{ boxShadow: BOX_SHADOW_CSS_RULE, height: 'fit-content' }} >
                        <GoogleMap height="80vh" orders={currentOrders} />
                    </div>
                </div>
                <div className="col-12 col-sm-4 mt-0 pt-0 pb-3 overflow_sm_auto mh_sm_84vh border_radius_30" >
                    {currentOrders.map((order, index) => <Order key={'order_' + order.id} order={order} index={index} />)}
                </div>
            </div>

        </Collapse>
    );
}
