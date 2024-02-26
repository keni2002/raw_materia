import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiTable = createApi({
    reducerPath: 'apiTable',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
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
            }),invalidatesTags: ["Comerciales"],
            
        }),
        
    }),
})
export const {
    useGetComprasQuery,
    useGetContratosQuery,
    useGetComercialesQuery,
    useUpdateComercialMutation,
    } = apiTable