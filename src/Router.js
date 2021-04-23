import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CategoryIndex from "./pages/category/CategoryIndex";
import CategoryShow from "./pages/category/CategoryShow";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";

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
        <Route key="client-route-home" exact path="/" >
            {shopUserIsAuthenticated ?
                <Layout><Home /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="client-route-home" exact path="/category" >
            {shopUserIsAuthenticated ?
                <Layout><CategoryIndex /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="client-route-category-show" exact
               path="/category/:categoryId/product"
               component={(props) => <Layout><CategoryShow categoryId={props.match.params.categoryId} /></Layout>}
        />,

       // TODO: Categories listing

        <Route key="client-route-profile" exact path="/profile" >
            {shopUserIsAuthenticated ?
                <Layout><Profile /></Layout> :
                <Redirect to="/login" />
            }
        </Route>,

        <Route key="client-route-login" exact path="/login" >
            {shopUserIsAuthenticated ?
                <Redirect to="/" /> :
                <Layout><Login /></Layout>
            }
        </Route>,
    ];

    return routes;
}

export default Router;
