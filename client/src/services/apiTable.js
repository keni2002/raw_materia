import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiTable = createApi({
    reducerPath: 'apiTable',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
    endpoints: (builder) => ({
        getCompras: builder.query({
            query: () => 'compras/',
        }),
        getContratos: builder.query({
            query: () => 'contratos/',
        }),
    }),
})
export const {useGetComprasQuery, useGetContratosQuery} = apiTable