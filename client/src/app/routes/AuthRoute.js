import React from 'react'
import MainLayout from './layout/MainLayout'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function AuthRoute() {
  const { isAuthenticated } = useSelector((state) => state.user)
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }
  return <Navigate to="/" />

}
