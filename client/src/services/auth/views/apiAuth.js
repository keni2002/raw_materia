import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from "../../../config/customeBaseQuery"

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: customFetchBase,
  endpoints: () => ({}),
});

