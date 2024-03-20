
//DIRECTOR
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../config/customeBaseQuery'
export const apiDir = createApi({
    reducerPath: 'apiDir',
    baseQuery: customFetchBase,

    tagTypes: ['Director'],
    endpoints: (builder) => ({


        getDirs: builder.query({
            query: () => ({
                url: `directores/`,
                method: 'GET'
            }),
            providesTags: ["Director"],
        }),

        getDir: builder.query({  //Para obtener un solo comercial
            query: (id) => ({
                url: `directores/${id}/`,
                method: 'GET'
            }),
            providesTags: ["Director"]
        }),
        updateDir: builder.mutation({
            query: (updateInfo) => ({
                url: `directores/${updateInfo.id}/`,
                method: 'PATCH',
                body: updateInfo,
            }),
            invalidatesTags: ["Director"],

        }),
        deleteDir: builder.mutation({
            query: (id) => ({
                url: `directores/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Director"],
        }),
        createDir: builder.mutation({
            query: (comercial) => ({
                url: '/directores/',
                method: 'POST',
                body: comercial,
            }),
            invalidatesTags: ["Directores"],
        }),

    })
})
export const {

} = apiDir