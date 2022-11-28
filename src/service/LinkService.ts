import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const linkApi = createApi({
  reducerPath: 'socialAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (build) => ({
    shortenUrl: build.mutation<string, string>({
      query: (originalUrl) => ({
        url: '/links',
        body: {
          originalUrl: originalUrl
        },
        method: 'POST',
        responseHandler: response => response.text()
      })
    }),
    getOriginalUrl: build.mutation<string, string>({
      query: (shortenUrl) => ({
        url: '/' + shortenUrl,
        method: 'GET',
        responseHandler: response => response.text()
      })
    })
  })
})