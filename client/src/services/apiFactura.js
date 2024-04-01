
//Facturas
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiFact = createApi({
    reducerPath: 'apiFact',
    baseQuery: customFetchBase,

    tagTypes: ['Facturas'],
    endpoints: (builder) => ({


        getFacts: builder.query({
            query: () => ({
                url: `facturas/`,
                method: 'GET'
            }),
            providesTags: ["Facturas"],
        }),

        getFact: builder.query({  //Para obtener un sola factura
            query: (id) => ({
                url: `facturas/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Facturas"]
        }),
        updateFact: builder.mutation({
            query: (updateInfo) => ({
                url: `facturas/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Facturas"],

        }),
        deleteFact: builder.mutation({
            query: (id) => ({
                url: `facturas/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Facturas"],
        }),
        createFact: builder.mutation({
            query: (fact) => ({
                url: '/facturas/',
                method: 'POST',
                body: fact,
            }),
            invalidatesTags: ["Facturas"],
        }),

    })
})
export const {
    useLazyGetFactQuery,
    useLazyGetFactsQuery,
    useCreateFactMutation,
    useUpdateFactMutation,
    useDeleteFactMutation
} = apiFact