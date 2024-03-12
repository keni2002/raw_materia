import { createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from "../../src/config/customeBaseQuery"
export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: customFetchBase,
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