
//DEPARTAMENTOS Asistentes
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiAsist = createApi({
    reducerPath: 'apiAsist',
    baseQuery: customFetchBase,

    tagTypes: ['Asistentes'],
    endpoints: (builder) => ({


        getAsists: builder.query({
            query: () => ({
                url: `asistentes/`,
                method: 'GET'
            }),
            providesTags: ["Asistentes"],
        }),

        getAsist: builder.query({  //Para obtener un solo asistente
            query: (id) => ({
                url: `asistentes/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Asistentes"]
        }),
        updateAsist: builder.mutation({
            query: (updateInfo) => ({
                url: `asistentes/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Asistentes"],

        }),
        deleteAsist: builder.mutation({
            query: (id) => ({
                url: `asistentes/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Asistentes"],
        }),
        createAsist: builder.mutation({
            query: (asistente) => ({
                url: '/asistentes/',
                method: 'POST',
                body: asistente,
            }),
            invalidatesTags: ["Asistentes"],
        }),

    })
})
export const {
    useLazyGetAsistsQuery,
    useLazyGetAsistQuery,
    useCreateAsistMutation,
    useUpdateAsistMutation,
    useDeleteAsistMutation,

} = apiAsist