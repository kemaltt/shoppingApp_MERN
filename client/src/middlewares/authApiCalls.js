import { publicRequest } from "../constants/api/apiUrl";
import { loginFail, loginStart, loginSuccess, registerFail, registerStart, registerSuccess } from "../redux/authSlice";
import { addToCartFail, addToCartStart, addToCartSuccess, getCartFail, getCartStart, getCartSuccess } from "../redux/cartSlice";
import { fetchAllProducts, fetchProduct, fetchProductsFail, fetchProductsSuccess, fetchProductFail, fetchProductSuccess } from "../redux/productSlice";



export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post(`/api/login`, user);
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

export const logout = async (dispatch) => {
  dispatch(logout())
}

export const fetchProducts = async (dispatch) => {
  dispatch(fetchAllProducts())
  try {
    const response = await publicRequest.get(`api/products`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const fetchSingleProduct = async (dispatch, id) => {
  dispatch(fetchProduct())
  try {
    const response = await publicRequest.get(`api/product/${id}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const addToCart = async (dispatch, product) => {
  dispatch(addToCartStart())
  try {
    const response = await publicRequest.post(`api/add-to-cart`, product);
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const getCart = async (dispatch) => {
  dispatch(getCartStart())
  try {
    const response = await publicRequest.get(`api/cart`);
    dispatch(getCartSuccess(response?.data?.products));
  } catch (error) {
    dispatch(getCartFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}