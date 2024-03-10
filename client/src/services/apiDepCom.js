
//DEPARTAMENTOS COMERCIALES
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './api'

export const apiDpCom = createApi({
    reducerPath: 'apiDpCom',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['DpComerciales'],
    endpoints: (builder) => ({
        
        getDpCom: builder.query({

            query: () => ({
                url: `dpcomerciales/`,
                method: 'GET',
            }),
            providesTags: ["Dpcomerciales"]
        }),
    })
})
export const {
    useGetDpComQuery,
} = apiDpCom