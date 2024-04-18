import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {SERVER_HOST_IP} from "../constants/config";

export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        uploading: false,
        uploadedFile: null,
        error: null,
    },
    reducers: {
        uploadStart: (state) => {
            state.uploading = true;
            state.error = null;
        },
        uploadSuccess: (state, action) => {
            state.uploading = false;
            state.uploadedFile = action.payload;
        },
        uploadFailure: (state, action) => {
            state.uploading = false;
            state.error = action.payload;
        },
    },
});


export const uploadFile = (file,text, token) => async (dispatch) => {
    dispatch(uploadStart());
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('textData', text)
        // const axiosInstance = axios.create({
        //     baseURL: SERVER_HOST_IP, // Replace your_port_number with the port you are using
        // });
        const res = await axios.post(`${SERVER_HOST_IP}/upload/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            },


        });

        dispatch(uploadSuccess(res.data));
    } catch (error) {
        dispatch(uploadFailure(error.message));
    }
};

export const { uploadStart, uploadSuccess, uploadFailure } = uploadSlice.actions;

export default uploadSlice;
