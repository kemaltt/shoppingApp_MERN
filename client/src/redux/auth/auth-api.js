// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from '../../constants/api/apiUrl'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
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
    verifyAccount: builder.mutation({
      query: (token) => ({
        url: `/verify-account?token=${token}`,
        method: 'GET',
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
        url: `/reset-password/${data.reset_password_key}`,
        method: 'PUT',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: '/upload-profile-image',
        method: 'POST',
        body: formData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/update-user',
        method: 'PUT',
        body: data,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation, useUploadProfileImageMutation, useUpdateUserMutation, useVerifyAccountMutation } = authApi
