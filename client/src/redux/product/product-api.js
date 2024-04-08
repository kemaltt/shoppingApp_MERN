// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants/api/apiUrl'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: (category) => ({
        url: '/products',
        params: {
          category: category || 'All',
        },
      }),
    }),
    getProductById: builder.query({
      query: ({ id, token }) => ({
        url: `/product/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const { useGetProductsMutation, useGetProductByIdQuery } = productApi