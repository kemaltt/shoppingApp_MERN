import { toast } from "react-toastify";
import { publicRequest, userRequest } from "../constants/api/apiUrl";
import { loginFail, loginStart, loginSuccess, logout, registerFail, registerStart, registerSuccess } from "../redux/authSlice";
import { addToCartFail, addToCartStart, addToCartSuccess, getCartFail, getCartStart, getCartSuccess, removeFromCart, removeFromCartFail, removeFromCartSuccess } from "../redux/cartSlice";
import { fetchAllProducts, fetchProduct, fetchProductsFail, fetchProductsSuccess, fetchProductFail, fetchProductSuccess, fetchProductStart } from "../redux/productSlice";



export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post(`/api/login`, user);
    console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const register = async (dispatch, user) => {
  dispatch(registerStart())
  try {
    const response = await publicRequest.post(`/api/register`, user);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const logoutBE = async (dispatch) => {
  dispatch(logout())
  try {
    const response = await userRequest.get(`/api/logout`);

  } catch (error) {
    console.log(error);
  }
}

export const fetchProducts = async (dispatch) => {
  dispatch(fetchAllProducts())
  try {
    const response = await publicRequest.get(`api/products`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const fetchSingleProduct = async (dispatch, id) => {
  dispatch(fetchProductStart())
  try {
    const response = await userRequest.get(`api/product/${id}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const addCart = async (dispatch, product) => {
  dispatch(addToCartStart())
  try {
    const response = await userRequest.post(`api/add-to-cart`, product);
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const getCart = async (dispatch) => {
  dispatch(getCartStart())
  try {
    const response = await userRequest.get(`api/cart`);
    console.log(response);
    dispatch(getCartSuccess(response?.data?.products));
  } catch (error) {
    dispatch(getCartFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const removeCart = async (dispatch, id) => {
  dispatch(removeFromCart())
  try {
    const response = await userRequest.delete(`api/remove-from-cart/${id}`);
    dispatch(removeFromCartSuccess(response.data));
  } catch (error) {
    dispatch(removeFromCartFail(error.response.data.message || 'Something went wrong!'))
  }
}