import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const socialAPI = createApi({
  reducerPath: 'socialAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (build) => ({

  })
})