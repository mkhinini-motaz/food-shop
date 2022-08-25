import React from 'react';
import { useSelector } from 'react-redux'
import Translate from "../common/Translate";
import { Button } from "@material-ui/core";

export default function ShopTransporter(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const shopTransporter = props.shopTransporter;
    const flexRowClassName = selectedLangWriteFrom === 'right' ? ' flex-row-reverse ' : '';

    return (
        <div className={flexRowClassName + ' d-flex row my-2 py-2'} style={{ backgroundColor: '#999', borderRadius: '15px', }}>
            <div className="col-5">
                {shopTransporter.first_name}
            </div>
            <div className="col-7 px-0">
                <div>
                    <Translate value="shop_user:active_orders" params={{ count: shopTransporter.active_orders_count }} />
                </div>
                <div>
                    <Button variant="contained" onClick={() => props.onClick()} color="primary">
                        <Translate value="order:affect" />
                    </Button>
                </div>
            </div>

        </div>
    );
}
