import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiTable = createApi({
    reducerPath: 'apiTable',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
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
        getComerciales: builder.query({
            query: () => 'comerciales/',
            providesTags: ["Comerciales"],
        }),

        
        updateComercial: builder.mutation({
            query: (updateInfo) => ({
                url: `comerciales/${updateInfo.id}`,
                method: 'PATCH',
                body: updateInfo,
            }),
           invalidatesTags : ["Comerciales"],
            
        }),

        //Asistentes
        getAsistentes: builder.query({
            query: () => 'asistentes/',
            providesTags: ["Asistentes"],
        }),
        updateAsistente: builder.mutation({
            query: (updateInfo) => ({
                url: `asistentes/${updateInfo.id}`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Asistentes"],
        }),

        //Suministradores
        getSuministradores: builder.query({
            query: () => 'suministradores/',
            providesTags: ["Suministradores"],
        }),
        updateSuministrador: builder.mutation({
            query: (updateInfo) => ({
                url: `suministradores/${updateInfo.id}`,
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
    useGetComercialesQuery,
    useUpdateComercialMutation,
    useGetAsistentesQuery,
    useUpdateAsistenteMutation,
    useGetSuministradoresQuery

    } = apiTable