import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError, setLoading} from "../slice/authSlice";
import {setRoles, setToken} from "../helpers/auth";
import {SERVER_HOST_IP} from "../constants/config";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_HOST_IP}`,}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        onSuccess: (data, { dispatch }) => {
            const { token, roles } = data;
            setToken(token);
            setRoles(roles);
            dispatch(setLoading(false));
        },
        onError: (error, { dispatch }) => {
            dispatch(setError(error.message));
        },
        getUserData: builder.query({
            query: () => '/user',
        }),
    }),
});

export const { useLoginMutation, useGetUserDataQuery  } = authApi

