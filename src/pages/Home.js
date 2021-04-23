import React from 'react';
import {Collapse, Divider} from '@material-ui/core';
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from "../constants";
import { useDispatch, useSelector} from "react-redux";
import GoogleMap from "../components/common/GoogleMap";
import { getCurrentOrders } from "../store/actions";
import ProductList from "../components/cart/ProductList";

export default function Home(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);
    React.useEffect(() => dispatch(getCurrentOrders({})), []);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders.data);

    return (
        <Collapse in={isShown}>
            <div className="row">
                <div className={'bg-white my-2 p-2 col-8'} style={{ boxShadow: BOX_SHADOW_CSS_RULE, height: 'fit-content' }}>
                    <GoogleMap height="70vh" orders={currentOrders} />
                </div>
                <div className="col-4 mt-0 pt-0 pb-3" >
                    {currentOrders.map((order, index) =>
                        <div className="bg-white my-2" style={{ boxShadow: BOX_SHADOW_CSS_RULE }} key={'order_list_' + order.id} >
                            <ProductList order={order} showPromoCode={false} showTotal={false} showProductPhotos={false} />
                        </div>)
                    }
                </div>
            </div>

        </Collapse>
    );
}
