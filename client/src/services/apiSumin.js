
//Suministradores
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiSum = createApi({
    reducerPath: 'apiSum',
    baseQuery: customFetchBase,

    tagTypes: ['Suministradores'],
    endpoints: (builder) => ({


        getSums: builder.query({
            query: () => ({
                url: `suministradores/`,
                method: 'GET'
            }),
            providesTags: ["Suministradores"],
        }),

        getSum: builder.query({  //Para obtener un solo Suministradores
            query: (id) => ({
                url: `suministradores/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Suministradores"]
        }),
        updateSum: builder.mutation({
            query: (updateInfo) => ({
                url: `suministradores/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Suministradores"],

        }),
        deleteSum: builder.mutation({
            query: (id) => ({
                url: `suministradores/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Suministradores"],
        }),
        createSum: builder.mutation({
            query: (sumin) => ({
                url: '/suministradores/',
                method: 'POST',
                body: sumin,
            }),
            invalidatesTags: ["Suministradores"],
        }),

    })
})
// eslint-disable-next-line no-empty-pattern
export const {
    useGetSumsQuery,
    useLazyGetSumQuery,
    useUpdateSumMutation,
    useCreateSumMutation
} = apiSum