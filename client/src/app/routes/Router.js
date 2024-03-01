import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Register from '../pages/auth/Register';
import Cart from '../components/CartSide';
import Compare from '../pages/Compare';
import ProductDetail from '../pages/ProductDetail';
import Footer from '../components/Footer';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/auth/Login';
import Home from '../pages/Home';

export default function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}
