import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithLogout, getToken } from "../helpers/auth";
import { SERVER_HOST_IP } from "../constants/config";
// export { useGetCoursesQuery } from './path/to/classApi';

export const classApi = createApi({
    reducerPath: 'classApi',
    baseQuery: baseQueryWithLogout,
    endpoints: (builder) => ({
        createLesson: builder.mutation({
            query: (body) => ({
                url: '/class',
                method: 'POST',
                body
            }),
        }),
        getLessons: builder.mutation({
            query: (courseId) => ({
                url: '/class',
                method: 'GET',
                params: { courseId },
            }),
        }),
        getCourses: builder.query({
            query: () => ({
                url: '/course',
                method: 'GET',
            }),
        }),
    }),
});

export const { useCreateLessonMutation, useGetLessonsMutation, useGetCoursesQuery } = classApi;










// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import {baseQueryWithLogout, getToken} from "../helpers/auth";
// import {SERVER_HOST_IP} from "../constants/config";
// export const classApi = createApi({
// 	reducerPath: 'classApi',
// 	// baseQuery: fetchBaseQuery({
// 	// baseUrl: SERVER_HOST_IP,
// 	// 	prepareHeaders: (headers, { getState }) => {
// 	// 			const token = getToken();
// 	// 			// If we have a token set in state, let's assume that we should be passing it.
// 	// 			if (token) {
// 	// 				headers.set('authorization', token)
// 	// 			}
// 	// 			return headers
// 	// 		},
// 	// 	}),
// 	baseQuery: baseQueryWithLogout,
// 	endpoints: (builder) => ({
// 		createLesson: builder.mutation({
// 			query: (body) => ({
// 				url: '/class',
// 				method: 'POST',
// 				body
// 			}),
// 		}),

// 		getLessons: builder.mutation({
// 			query: (courseId) => ({
// 				url: '/class',
// 				method: 'GET',
// 				params: { courseId },
// 			}),
// 		})
// 	}),
// });

// export const { useCreateLessonMutation, useGetLessonsMutation } = classApi

