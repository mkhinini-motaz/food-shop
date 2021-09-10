import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import DescriptionIcon from '@material-ui/icons/Description';

import GoogleMap from "../components/common/GoogleMap";
import Order from "../components/order/Order";
import Translate from "../components/common/Translate";
import Tabs from "../components/common/Tabs";
import { getCurrentOrders } from "../store/actions";
import { BOX_SHADOW_CSS_RULE, COMPONENT_SHOW_DELAY } from "../constants";

export default function Home(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = selectedLangWriteFrom === 'right' ? 'flex-row-reverse ' : ' ';
    const tabTitleClassName = 'd-inline-flex ' + flexRowClassName;

    setTimeout(() => { setIsShown((previousIsShown) => true); }, COMPONENT_SHOW_DELAY);

    React.useEffect(() => dispatch(getCurrentOrders({})), []);
    const currentOrders = useSelector(state => state.OrderReducer.currentOrders.data);

    const tabs = [
        {
            title: <span className={tabTitleClassName}>
                <MapIcon />
                <span className="mx-2"></span>
                <Translate value="order:map" />
            </span>,
            content: <div className="my-2 col-12 col-sm-8 mx-auto " >
                <div className="bg-white p-2 border_radius_15" style={{ boxShadow: BOX_SHADOW_CSS_RULE, height: 'fit-content' }} >
                    <GoogleMap height="80vh" orders={currentOrders} />
                </div>
            </div>,
        },
        {
            title: <span className={tabTitleClassName}>
                <DescriptionIcon />
                <span className="mx-2"></span>
                <Translate value="order:cards" />
            </span>,
            content: <div className={"m-2 text-center d-flex justify-content-center flex-wrap " + flexRowClassName} >
                {currentOrders.map((order, index) => <Order key={'order_card_' + order.id} order={order} index={index} />)}
            </div>,
        }
    ];

    return (
        <Collapse in={isShown}>
            <div className="row">
                <Tabs tabs={tabs} />
            </div>
        </Collapse>
    );
}
