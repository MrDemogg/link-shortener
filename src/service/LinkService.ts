import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const linkApi = createApi({
  reducerPath: 'linkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (build) => ({
    urlShortener: build.mutation<string, string>({
      query: (originalUrl) => ({
        url: '/links',
        body: {
          originalUrl: originalUrl
        },
        method: 'POST'
      })
    })
  })
})