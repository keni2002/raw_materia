
//CONTRATOS
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiContra = createApi({
    reducerPath: 'apiContra',
    baseQuery: customFetchBase,

    tagTypes: ['Contratos'],
    endpoints: (builder) => ({


        getContrats: builder.query({
            query: () => ({
                url: `contratos/`,
                method: 'GET'
            }),
            providesTags: ["Contratos"],
        }),

        getContrat: builder.query({  //Para obtener un solo comercial
            query: (id) => ({
                url: `contratos/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Contratos"]
        }),
        updateContrat: builder.mutation({
            query: (updateInfo) => ({
                url: `contratos/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Contratos"],

        }),
        deleteContrat: builder.mutation({
            query: (id) => ({
                url: `contratos/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Contratos"],
        }),
        createCotrat: builder.mutation({
            query: (contrato) => ({
                url: '/contratos/',
                method: 'POST',
                body: contrato,
            }),
            invalidatesTags: ["Contratos"],
        }),

    })
})
export const {
    useCreateCotratMutation,
    useGetContratsQuery,
    useLazyGetContratQuery,
    useLazyGetContratsQuery,
    useUpdateContratMutation,
    useDeleteContratMutation
} = apiContra