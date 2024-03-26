
//INFORME
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
import { apiContra } from './apiContratos';
export const apinForme = createApi({
    reducerPath: 'apinForme',
    baseQuery: customFetchBase,

    tagTypes: ['Informes'],
    endpoints: (builder) => ({


        getInformes: builder.query({
            query: () => ({
                url: `informes/`,
                method: 'GET'
            }),
            providesTags: ["Informes"],
        }),

        getInforme: builder.query({  //Para obtener un solo informe
            query: (id) => ({
                url: `informes/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Informes"]
        }),
        updateInforme: builder.mutation({
            query: (updateInfo) => ({
                url: `informes/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Informes"],

        }),
        deleteInforme: builder.mutation({
            query: (id) => ({
                url: `informes/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Informes"],
        }),
        createInforme: builder.mutation({
            query: (informe) => ({
                url: '/informes/',
                method: 'POST',
                body: informe,
            }),
            invalidatesTags: ["Informes"],
        }),
        invalidatesTags: ["Contratos"],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                await queryFulfilled;
                dispatch(
                    apiContra.util.invalidateTags(["Contratos"])
                );
            } catch (error) {
                console.log(error)
            }
        },

    })
})
export const {
    useCreateInformeMutation,
    useLazyGetInformeQuery,
    useLazyGetInformesQuery,
    useUpdateInformeMutation,
    useDeleteInformeMutation
} = apinForme
