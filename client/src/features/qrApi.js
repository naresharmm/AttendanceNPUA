import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {SERVER_HOST_IP} from "../constants/config";

export const qrApi = createApi({
    reducerPath: 'qrApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_HOST_IP }), // Assuming your API base URL is /api
    endpoints: (builder) => ({
        generateQRCode: builder.query({
            query: ({ userId, classroomId }) => `/qr/generateQR/1/1`,
        }),
    }),
});

export const { useGenerateQRCodeQuery } = qrApi;