import React from 'react'
import MainLayout from './layout/MainLayout';
import { Outlet } from 'react-router-dom';

export default function PuplicRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
