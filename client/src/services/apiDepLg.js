
//DEPARTAMENTOS COMERCIALES
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiDpCom = createApi({
    reducerPath: 'apiTable',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
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