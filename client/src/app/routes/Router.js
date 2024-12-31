import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from '../pages/auth/Register';
import CompareList from '../pages/CompareList';
import ProductDetail from '../pages/ProductDetail';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/auth/Login';
import { useSelector } from 'react-redux';
import Product from '../modules/product/Product';
import ResetPassword from '../pages/auth/ResetPassword';
import PasswordForgot from '../pages/auth/PasswordForgot';
import Favorite from '../pages/Favorite';
import Home from '../pages/Home';
import CartList from '../pages/CartList';
import Profile from '../pages/auth/Profile';
import VerifyAccount from '../pages/auth/VerifyAccount';
import PublicRoute from './PublicRoute';




export default function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthRoute />} >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<PasswordForgot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart-list" element={<CartList />} />
          <Route path="/compare" element={<CompareList />} />
          <Route path="/favorite-list" element={<Favorite />} />
          <Route path="/product-list" element={user?.user?.role === 'admin' ? <Product /> : <Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}
