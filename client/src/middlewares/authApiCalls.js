import { toast } from "react-toastify";
import { BASE_URL, publicRequest, userRequest } from "../constants/api/apiUrl";
import { addToCartFail, addToCartStart, addToCartSuccess, getCartFail, getCartStart, getCartSuccess, removeFromCart, removeFromCartFail, removeFromCartSuccess } from "../redux/cartSlice";
import { fetchAllProducts, fetchProduct, fetchProductsFail, fetchProductsSuccess, fetchProductFail, fetchProductSuccess, fetchProductStart, getCategoryProducts, getCategoryProductsSuccess, getCategoryProductsFail } from "../redux/productSlice";
import axios from "axios";



export const fetchProducts = async (dispatch) => {
  dispatch(fetchAllProducts())
  try {
    const response = await publicRequest.get(`api/products`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const fetchSingleProduct = async (dispatch, id, token) => {
  dispatch(fetchProductStart())
  try {
    const response = await axios.get(`${BASE_URL}/api/product/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

    });
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const fetchCategoryProducts = async (dispatch, category) => {
  dispatch(getCategoryProducts())
  try {
    const response = await axios.get(`${BASE_URL}/api/category`, {
      params: {
        category: category
      }

    });
    dispatch(getCategoryProductsSuccess(response.data));
  } catch (error) {
    dispatch(getCategoryProductsFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const addCart = async (dispatch, product, token) => {
  dispatch(addToCartStart())
  try {
    const response = await axios.post(`${BASE_URL}/api/add-to-cart`, product, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const getCart = async (dispatch, token) => {
  dispatch(getCartStart())
  try {
    const response = await axios.get(`${BASE_URL}/api/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    dispatch(getCartSuccess(response?.data));
  } catch (error) {
    console.log(error?.response?.data?.message);
    dispatch(getCartFail(error?.response?.data?.message || 'Something went wrong!'))
  }
}

export const removeCart = async (dispatch, id, token) => {
  dispatch(removeFromCart())
  try {
    const response = await axios.delete(`${BASE_URL}/api/remove-from-cart/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(removeFromCartSuccess(response?.data));
  } catch (error) {
    dispatch(removeFromCartFail(error.response.data?.message || 'Something went wrong!'))
  }
}