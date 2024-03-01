import React from 'react'
import { useSelector } from 'react-redux'
import MainLayout from './layout/MainLayout'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user)

  if (isAuthenticated) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }
  return <Navigate to="/login" />
}
