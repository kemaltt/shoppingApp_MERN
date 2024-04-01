// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const BASE_URL = 'http://localhost:9090/api'

export const favApi = createApi({
  reducerPath: 'favApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token; // user slice'ından token bilgisini al
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // headers'a token'i ekle
    }
    return headers;
  },
  endpoints: (builder) => ({
    getFavorite: builder.mutation({
      query: (token) => ({
        url: '/get-favorites',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addFavorite: builder.mutation({
      query: (id, token) => ({
        url: `/add-favorite/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDkzNzcyYWY4NGEyOGQyYzg0YmEwMyIsImlhdCI6MTcxMTk3MDg5MywiZXhwIjoxNzEyMDU3MjkzfQ.he6muH1W2sg22roujaE8_hessONzKrNtTnXAt1uO1cI'}`,
        },
      }),
    }),
    deleteFavorite: builder.mutation({
      query: (id, token) => ({
        url: `/delete-favorite/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDkzNzcyYWY4NGEyOGQyYzg0YmEwMyIsImlhdCI6MTcxMTk3MDg5MywiZXhwIjoxNzEyMDU3MjkzfQ.he6muH1W2sg22roujaE8_hessONzKrNtTnXAt1uO1cI'}`,
        },
      })
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteMutation } = favApi
