import {logout} from "../slice/authSlice";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SERVER_HOST_IP} from "../constants/config";

export const isAuthenticated = () => {
    return !!getToken();
};

export const setRoles = (roles) => {
    localStorage.setItem('roles', JSON.stringify(roles));
};
export const getRoles = () => {
    return JSON.parse(localStorage.getItem('roles'));
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

const baseQuery = fetchBaseQuery({ baseUrl: `${SERVER_HOST_IP}`, prepareHeaders: (headers, { getState }) => {
        const token = getToken();
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', token)
        }
        return headers
    },
});

export const baseQueryWithLogout = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result
}