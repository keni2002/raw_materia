
//DEPARTAMENTOS COMERCIALES
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiCom = createApi({
    reducerPath: 'apiCom',
    baseQuery: customFetchBase,

    tagTypes: ['Comerciales'],
    endpoints: (builder) => ({


        getComs: builder.query({
            query: () => ({
                url: `comerciales/`,
                method: 'GET'
            }),
            providesTags: ["Comerciales"],
        }),

        getCom: builder.query({  //Para obtener un solo comercial
            query: (id) => ({
                url: `comerciales/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Comerciales"]
        }),
        updateCom: builder.mutation({
            query: (updateInfo) => ({
                url: `comerciales/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Comerciales"],

        }),
        deleteCom: builder.mutation({
            query: (id) => ({
                url: `comerciales/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Comerciales"],
        }),
        createCom: builder.mutation({
            query: (comercial) => ({
                url: '/comerciales/',
                method: 'POST',
                body: comercial,
            }),
            invalidatesTags: ["Comerciales"],
        }),

    })
})
export const {
    useLazyGetComQuery,
    useLazyGetComsQuery,
    useCreateComMutation,
    useUpdateComMutation,
    useDeleteComMutation
} = apiCom