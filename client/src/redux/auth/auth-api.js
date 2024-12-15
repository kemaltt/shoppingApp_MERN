// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants/api/apiUrl'

// Define a service using a base URL and expected endpoints


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: email,
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/reset-password/${data.id}/${data.token}`,
        method: 'PUT',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: '/logout',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi
