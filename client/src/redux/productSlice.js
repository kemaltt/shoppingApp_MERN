import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchAllProducts: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCategoryProducts: (state) => {
      state.loading = false;
    },
    getCategoryProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCategoryProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductReducer: (state) => {
      state.product = {};
      state.loading = false;
      state.error = null;
    }
  },
});

export const { fetchAllProducts, fetchProductsSuccess, fetchProductsFail, fetchProductStart, fetchProductSuccess, fetchProductFail, clearProductReducer, getCategoryProducts, getCategoryProductsSuccess, getCategoryProductsFail } = productSlice.actions;

export default productSlice.reducer;