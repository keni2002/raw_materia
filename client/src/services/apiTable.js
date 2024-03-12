import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'


export const apiTable = createApi({
    reducerPath: 'apiTable',
    baseQuery: customFetchBase,
    tagTypes: ['Comerciales'],
    endpoints: (builder) => ({
        //COMPRAS
        getCompras: builder.query({
            query: () => 'compras/',
        }),


        //CONTRATOS
        getContratos: builder.query({
            query: () => 'contratos/',
        }),


        //Comerciales
       

        //Asistentes
        getAsistentes: builder.query({
            query: () => 'asistentes/',
            providesTags: ["Asistentes"],
        }),
        updateAsistente: builder.mutation({
            query: (updateInfo) => ({
                url: `asistentes/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Asistentes"],
        }),
        createAsistente: builder.mutation({
            query: (asistente) => ({
                url: 'asistentes/',
                method: 'POST',
                body: asistente,
            }),
            invalidatesTags: ["Asistentes"],
        }),
        getAsistente: builder.query({
            query: (id) => `asistentes/${id}/`,
            providesTags: ["Asistentes"],
        }),


        //Suministradores
        getSuministradores: builder.query({
            query: () => 'suministradores/',
            providesTags: ["Suministradores"],
        }),
        updateSuministrador: builder.mutation({
            query: (updateInfo) => ({
                url: `suministradores/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Suministradores"],
        }),
        
        
    }),
})
export const {
    useGetComprasQuery,
    useGetContratosQuery,

    useGetAsistentesQuery,
    useUpdateAsistenteMutation,
    useGetSuministradoresQuery,
    useCreateAsistenteMutation,
    useGetAsistenteQuery,
    } = apiTable