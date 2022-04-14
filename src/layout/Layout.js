import React from "react";
import {connect, useSelector} from "react-redux";

import AppBar from "./AppBar";
import Footer from "./Footer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Snackbar from "../components/common/Snackbar";
import { COLOR_PRIMARY } from "../constants";
import OrderDialog from "../components/order/OrderDialog";
import SideDrawer from "./SideDrawer";
import TransporterDialog from "../components/transporter/TransporterDialog";
import OrderStatusUpdateDialog from "../components/order/OrderStatusUpdateDialog";
import OrderStatusEditDialogReducer from "../store/reducers/OrderStatusEditDialogReducer";
import ProductCreateDialog from "../components/product/ProductCreateDialog";
import ProductDeleteDialog from "../components/product/ProductDeleteDialog";

export default function Layout(props) {
    const selectedLang               = useSelector((state) => state.I18nReducer.selectedLang);
    const orderDialogProps           = useSelector((state) => state.OrderDialogReducer);
    const confirmDialogProps         = useSelector((state) => state.ConfirmDialogReducer);
    const transporterDialogProps     = useSelector((state) => state.TransporterDialogReducer);
    const productCreateDialogProps   = useSelector(state => state.ProductDialogReducer.create);
    const productDeleteDialogProps   = useSelector(state => state.ProductDialogReducer.delete);
    const orderStatusEditDialogProps = useSelector((state) => state.OrderStatusEditDialogReducer);


    return (
        <div className={"main_layout_container main_layout_container_" + selectedLang} >
            <AppBar
                appbarBackgroundColor={COLOR_PRIMARY}
                appbarLinkColor="#ffffff"
            />
            <SideDrawer />
            <div className="container-fluid">{props.children}</div>
            <Footer />

            <ConfirmDialog
                isVisible={confirmDialogProps.isVisible}
                title={confirmDialogProps.title}
                content={confirmDialogProps.content}
                onConfirm={confirmDialogProps.onConfirm}
                onCancel={confirmDialogProps.onCancel}
            />

            <OrderDialog
                order={orderDialogProps.order}
                isVisible={orderDialogProps.isVisible}
                onConfirm={orderDialogProps.onConfirm}
                onCancel={orderDialogProps.onCancel}
            />

            <OrderStatusUpdateDialog
                order={orderStatusEditDialogProps.order}
                isVisible={orderStatusEditDialogProps.isVisible}
                isLoading={orderStatusEditDialogProps.orderStatusUpdateIsLoading}
            />

            <TransporterDialog
                order={transporterDialogProps.order}
                isVisible={transporterDialogProps.isVisible}
            />

            <ProductCreateDialog {...productCreateDialogProps} />
            <ProductDeleteDialog {...productDeleteDialogProps} />
            <Snackbar />
        </div>
    );
}
