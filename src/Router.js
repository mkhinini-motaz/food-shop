import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Redirect, useParams } from 'react-router-dom';

import Layout from "./layout/Layout";
import Home from "./pages/client/Home";
import Cart from "./pages/client/Cart";
import CategoryShow from "./pages/client/category/CategoryShow";
import Login from "./pages/client/auth/Login";
import Profile from "./pages/client/auth/Profile";

function Router(props) {
    let authClient   = useSelector(state => state.AuthReducer.authClient);
    let authShopUser = useSelector(state => state.AuthReducer.authShopUser);

    return (
        <BrowserRouter>
            {clientRoutes(authClient)}
            {shopUserRoutes(authShopUser)}
        </BrowserRouter>
    );
}

/**
 *
 * @param {object} authClient
 * @returns {array}
 */
function clientRoutes(authClient) {
    const clientIsAuthenticated = !!localStorage.getItem('client_access_token') && !!authClient.id;

    const routes = [
        <Route key="client-route-home" exact path="/" >
            <Layout><Home /></Layout>
        </Route>,

        <Route key="client-route-category-show" exact
               path="/category/:categoryId/product"
               component={(props) => <Layout><CategoryShow categoryId={props.match.params.categoryId} /></Layout>}
        />,

        <Route key="client-route-cart" exact path="/cart" >
            <Layout><Cart /></Layout>
        </Route>,

        <Route key="client-route-profile" exact path="/profile" >
            {clientIsAuthenticated ?
                <Layout><Profile /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="client-route-login" exact path="/login" >
            {clientIsAuthenticated ?
                <Redirect to="/profile" /> :
                <Layout><Login /></Layout>
            }
        </Route>,
    ];

    return routes;
}

/**
 *
 * @param {object} authShopUser
 * @returns {array}
 */
function shopUserRoutes(authShopUser) {
    const shopUserIsAuthenticated = !!localStorage.getItem('shop_user_access_token') && !!authShopUser.id;

    const routes = [
        <Route key="client-route-login" exact path="/shop/login" >
            {shopUserIsAuthenticated ?
                <Redirect to="/shop/profile" /> :
                <Layout><Login /></Layout>
            }
        </Route>,
    ];

    return routes;
}

export default Router;
