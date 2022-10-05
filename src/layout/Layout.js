import React from "react";
import { useSelector } from "react-redux";

import AppBar from "./AppBar";
import Footer from "./Footer";
import SideDrawer from "./SideDrawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Snackbar from "../components/common/Snackbar";
import { COLOR_PRIMARY } from "../constants";
import OrderDialog from "../components/order/OrderDialog";
import TransporterDialog from "../components/transporter/TransporterDialog";
import OrderStatusUpdateDialog from "../components/order/OrderStatusUpdateDialog";
import ProductCreateDialog from "../components/product/ProductCreateDialog";
import ProductDeleteDialog from "../components/product/ProductDeleteDialog";
import Loader from "../components/common/Loader";
import OrdersMapDialog from "../components/order/OrdersMapDialog";

export default function Layout(props) {
    const isLoading                  = useSelector(state => state.LoaderReducer.isLoading);
    const selectedLang               = useSelector((state) => state.I18nReducer.selectedLang);
    const orderDialogProps           = useSelector((state) => state.OrderDialogReducer);
    const confirmDialogProps         = useSelector((state) => state.ConfirmDialogReducer);
    const ordersMapDialogProps        = useSelector((state) => state.OrdersMapDialogReducer);
    const transporterDialogProps     = useSelector((state) => state.TransporterDialogReducer);
    const productCreateDialogProps   = useSelector(state => state.ProductDialogReducer.create);
    const productDeleteDialogProps   = useSelector(state => state.ProductDialogReducer.delete);
    const orderStatusEditDialogProps = useSelector((state) => state.OrderStatusEditDialogReducer);

    let loaderComponent = ! isLoading ? '' :
        <div className={"position-fixed py-5 d-flex justify-content-center"}
           style={{
               backgroundColor: COLOR_PRIMARY + '66',
               top: 0,
               left: '-15px',
               width: '100vw',
               height: '100vh',
               zIndex: 9999,
           }} >
            <Loader size={200} />
        </div>;

    return (
        <div className={"main_layout_container main_layout_container_" + selectedLang} >
            <AppBar
                appbarBackgroundColor={COLOR_PRIMARY}
                appbarLinkColor="#ffffff"
            />
            <SideDrawer />
            {loaderComponent}
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

            <OrdersMapDialog {...ordersMapDialogProps} />

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
