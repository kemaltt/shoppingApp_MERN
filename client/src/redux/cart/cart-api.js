import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants/api/apiUrl'



export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (token) => ({
        url: '/cart',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ token, product }) => ({
        url: `/add-to-cart`,
        method: 'POST',
        body: product,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteFromCart: builder.mutation({
      query: ({ token, id }) => ({
        url: `/delete-from-cart/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),

  }),
})

export const { useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation } = cartApi