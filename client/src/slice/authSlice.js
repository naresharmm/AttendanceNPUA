import { createSlice } from '@reduxjs/toolkit';
import {getToken} from "../helpers/auth";

const initialState = {
    isAuthenticated: !!getToken(),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setLoginSuccess: (state) => {
          state.loading = false;
          state.isAuthenticated = true
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
        },
    },
});




export const { setLoading, setError, logout, setLoginSuccess } = authSlice.actions;

export default authSlice;