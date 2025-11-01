import React from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Example() {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route element={<Outlet />} >
        <Route path='page' element={<div>{t('example.page')}</div>} />
        <Route path='test' element={<div style={{marginTop:'500px'}} > 
          <h1>{t('example.test')}</h1>
        </div>} />
      </Route>
      <Route index element={<Navigate to='/example/page' />} />
    </Routes>
  );
}
