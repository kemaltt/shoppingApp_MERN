import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from '../components/navbar/Navbar';
import Register from '../pages/auth/Register';
import CompareList from '../pages/CompareList';
import ProductDetail from '../pages/ProductDetail';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/auth/Login';
import Home from '../pages/Home';
import CartList from '../pages/CartList';
import WishList from '../pages/WishList';


export default function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />} >
          <Route path="/register" element={<Register />} />
          {/* <Route path="/register" element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartList />} />
          <Route path="/compare" element={<CompareList />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}
