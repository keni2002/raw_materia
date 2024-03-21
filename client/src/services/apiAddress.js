
//ADDRESS
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiAddress = createApi({
    reducerPath: 'apiAddress',
    baseQuery: customFetchBase,

    tagTypes: ['Address'],
    endpoints: (builder) => ({


        getAddresses: builder.query({
            query: () => ({
                url: `direcciones/`,
                method: 'GET'
            }),
            providesTags: ["Address"],
        }),

        getAddress: builder.query({  //Para obtener un solo comercial
            query: (id) => ({
                url: `direcciones/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Address"]
        }),
        updateAddress: builder.mutation({
            query: (updateInfo) => ({
                url: `direcciones/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Address"],

        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `direcciones/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Address"],
        }),
        createAddress: builder.mutation({
            query: (comercial) => ({
                url: '/direcciones/',
                method: 'POST',
                body: comercial,
            }),
            invalidatesTags: ["Address"],
        }),

    })
})
// eslint-disable-next-line no-empty-pattern
export const {

} = apiAddress