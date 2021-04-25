import React from 'react';
import {Collapse, makeStyles} from '@material-ui/core';
import {BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, COMPONENT_SHOW_DELAY} from "../constants";
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
    const lastOrderIndex = currentOrders.length - 1;
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const classes = makeStyles({
        orderCardRoot: {
            position: 'relative',
        },
        orderNumber: {
            backgroundColor: COLOR_PRIMARY,
            position: "absolute",
            color: 'white',
            zIndex: 3,
            textAlign: 'center',
            textTransform: 'uppercase',
            padding: 5,
            top: 0,
            [selectedLangWriteFrom === 'left' ? 'right' : 'left']: 0,
            minWidth: '35px',
            fontSize: '17px',
            fontWeight: '500',
            borderRadius: selectedLangWriteFrom === 'left' ? '0 15px 0 15px' : '15px 0 15px 0',
        },
    })();

    return (
        <Collapse in={isShown}>
            <div className="row">
                <div className="my-2 col-12 col-sm-8 " >
                    <div className="bg-white p-2 border_radius_15" style={{ boxShadow: BOX_SHADOW_CSS_RULE, height: 'fit-content' }} >
                        <GoogleMap height="80vh" orders={currentOrders} />
                    </div>
                </div>
                <div className="col-12 col-sm-4 mt-0 pt-0 pb-3 overflow_sm_auto mh_sm_84vh border_radius_30" >
                    {currentOrders.map((order, index) =>
                        <div className={classes.orderCardRoot + ' bg-white my-2 p-2 border_radius_15 ' + (index === lastOrderIndex ? 'mb-0' : 'mb-3')}
                             style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
                             key={'order_details_' + order.id}
                        >
                            <div className={classes.orderNumber}><span>{index + 1}</span></div>
                            <ProductList order={order} showPromoCode={false} showTotal={false} showProductPhotos={false} />
                        </div>)
                    }
                </div>
            </div>

        </Collapse>
    );
}
