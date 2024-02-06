import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.npoint.io",
  }),
  endpoints: (builder) => ({
    getWines: builder.query({
      query: () => `/83b6eb4db26667c0e7b7`,
    }),
  }),
});

export const { useGetWinesQuery } = apiSlice;
