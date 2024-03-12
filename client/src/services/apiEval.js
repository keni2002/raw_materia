
//DEPARTAMENTOS COMERCIALES
import { createApi } from '@reduxjs/toolkit/query/react'
import { apiCom } from './apiComercial';

import customFetchBase from '../config/customeBaseQuery';

export const apiEval = createApi({
    reducerPath: 'apiEval',
    baseQuery: customFetchBase,
    tagTypes: ['Evaluaciones'],
    endpoints: (builder) => ({

        getEvals: builder.query({

            query: () => ({
                url: `evaluaciones/`,
                method: 'GET',
            }),
            providesTags: ["Evaluaciones"]
        }),
        createEval: builder.mutation({
            query: (comercial) => ({
                url: '/evaluaciones/',
                method: 'POST',
                body: comercial,
            }),
            invalidatesTags: ["Evaluaciones"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        apiCom.util.invalidateTags(["Comerciales"])
                    );
                } catch (error) {
                    console.log(error)
                }
            },
        }),

    })
})
export const {
    useCreateEvalMutation
} = apiEval