//Evaluaciones perteneciente a un trabajador

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './api'

export const apiEvalsOf = createApi({
    reducerPath: 'apiEvalsOf',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['Evalsof'],
    endpoints: (builder) => ({
        
        getEvalOf: builder.query({

            query: (id) => ({
                url: `evalsof/${id}/`,
                method: 'GET',
            }),
            providesTags: ["Evalsof"]
        }),
    })
})
export const {
    useLazyGetEvalOfQuery
} = apiEvalsOf