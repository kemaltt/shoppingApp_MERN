import React from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

export default function Example() {
  return (
    <Routes>
      <Route element={<Outlet />} >
        <Route path='page' element={<div>Example Page</div>} />
        <Route path='test' element={<div style={{marginTop:'500px'}} > 
          <h1>Test</h1>
        </div>} />
      </Route>
      <Route index element={<Navigate to='/example/page' />} />
    </Routes>
  )
}
