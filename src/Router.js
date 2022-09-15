import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CategoryIndex from "./pages/category/CategoryIndex";
import CategoryShow from "./pages/category/CategoryShow";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import Settings from "./pages/Settings";
import Order from "./pages/order/Order";
import Overview from "./pages/order/Overview";
import EditOrder from "./pages/order/EditOrder";
import History from "./pages/order/History";

function Router(props) {
    let authShopUser = useSelector(state => state.AuthReducer.authShopUser);

    return (
        <BrowserRouter>
            {shopUserRoutes(authShopUser)}
        </BrowserRouter>
    );
}

/**
 *
 * @param {object} authShopUser
 * @returns {array}
 */
function shopUserRoutes(authShopUser) {
    const shopUserIsAuthenticated = !!localStorage.getItem('shop_user_access_token') && !!authShopUser.id;

    const routes = [
        <Route key="shop-route-home" exact path="/" >
            {shopUserIsAuthenticated ?
                <Layout><Home /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-order" exact path="/order" >
            {shopUserIsAuthenticated ?
                <Layout><Order /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-order-overview" exact path="/order/overview" >
            {shopUserIsAuthenticated ?
                <Layout><Overview /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-order-history" exact path="/order/history" >
            {shopUserIsAuthenticated ?
                <Layout><History /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-order-edit" exact
               path="/order/:orderId/edit"
               component={(props) => shopUserIsAuthenticated ?
                   <Layout><EditOrder orderId={props.match.params.orderId} /></Layout> :
                   <Redirect to="/login" />
               }
        />,

        <Route key="shop-route-category" exact path="/category" >
            {shopUserIsAuthenticated ?
                <Layout><CategoryIndex /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-category-show" exact
               path="/category/:categoryId/product"
               component={(props) => shopUserIsAuthenticated ?
                   <Layout><CategoryShow categoryId={props.match.params.categoryId} /></Layout> :
                   <Redirect to="/login" />
               }
        />,

       // TODO: Categories listing

        <Route key="shop-route-settings" exact path="/settings" >
            {shopUserIsAuthenticated ?
                <Layout><Settings /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-profile" exact path="/profile" >
            {shopUserIsAuthenticated ?
                <Layout><Profile /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="shop-route-login" exact path="/login" >
            {shopUserIsAuthenticated ?
                <Redirect to="/" /> :
                <Layout><Login /></Layout>
            }
        </Route>,

    ];

    return routes;
}

export default Router;
