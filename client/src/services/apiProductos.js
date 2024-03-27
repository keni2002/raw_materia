
//Productos 
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiProd = createApi({
    reducerPath: 'apiProd',
    baseQuery: customFetchBase,

    tagTypes: ['Productos'],
    endpoints: (builder) => ({


        getProds: builder.query({
            query: () => ({
                url: `productos/`,
                method: 'GET'
            }),
            providesTags: ["Productos"],
        }),

        getProd: builder.query({
            query: (id) => ({
                url: `productos/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Productos"]
        }),
        updateProd: builder.mutation({
            query: (updateInfo) => ({
                url: `productos/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Productos"],

        }),
        deleteProd: builder.mutation({
            query: (id) => ({
                url: `productos/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Productos"],
        }),
        createProd: builder.mutation({
            query: (productos) => ({
                url: '/productos/',
                method: 'POST',
                body: productos,
            }),
            invalidatesTags: ["Productos"],
        }),

    })
})
export const {
    useLazyGetProdQuery,
    useCreateProdMutation,
    useUpdateProdMutation,
    useLazyGetProdsQuery,
} = apiProd;