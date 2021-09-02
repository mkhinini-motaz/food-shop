import axios from "axios";

import { BASE_SHOP_API_URL } from "../../constants";
import { SET_SHOP_USERS_ARE_LOADING, SET_SHOP_USERS } from "./types";

export function setShopUsersAreLoading(status) {
    return { type: SET_SHOP_USERS_ARE_LOADING, payload: status };
}

export function setShopUsers(shopUsers) {
    return { type: SET_SHOP_USERS, payload: shopUsers };
}

export function getShopTransporters({ page = 1, perPage = 20, orderBy = 'created_at', orderDirection = 'desc' })  {
    return function(dispatch) {
        dispatch(setShopUsersAreLoading(true));
        const params = { page, perPage, orderBy, orderDirection };

        axios.get(BASE_SHOP_API_URL + '/shop-user/transporter', { params })
            .then(response => {
                dispatch(setShopUsers(response.data));
                dispatch(setShopUsersAreLoading(false));
            })
            .catch(error => {
                dispatch(setShopUsersAreLoading(false));
            });
    }
}
