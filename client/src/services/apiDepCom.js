
//DEPARTAMENTOS COMERCIALES
import {createApi} from '@reduxjs/toolkit/query/react'

import customFetchBase from '../config/customeBaseQuery'

export const apiDpCom = createApi({
    reducerPath: 'apiDpCom',
    baseQuery: customFetchBase,
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