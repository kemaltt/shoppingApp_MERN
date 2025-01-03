import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from '../../constants/api/apiUrl'



export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithAuth,
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
      query: (data) => ({
        url: `/add-to-cart`,
        method: 'POST',
        body: data,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/delete-from-cart/${id}`,
        method: 'DELETE',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
    }),
    updateCartById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-cart/${id}`,
        method: 'PATCH',
        body: data,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
  }),
})

export const { useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation, useUpdateCartByIdMutation } = cartApi