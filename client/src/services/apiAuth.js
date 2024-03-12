import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './api';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL}),
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (user) => ({
    //     url: 'register/',
    //     method: 'POST',
    //     body: user,
    //   }),
    // }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {  useLoginMutation } = apiAuth;