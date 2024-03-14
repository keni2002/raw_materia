//Evaluaciones perteneciente a un trabajador

import { createApi } from '@reduxjs/toolkit/query/react'

import customFetchBase from '../config/customeBaseQuery'

export const apiEvalsOf = createApi({
    reducerPath: 'apiEvalsOf',
    baseQuery: customFetchBase,
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