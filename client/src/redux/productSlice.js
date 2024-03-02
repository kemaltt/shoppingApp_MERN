import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: false,
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
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProduct: (state) => {
      state.loading = true;
    },
    fetchProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductReducer: (state) => {
      state.product = {};
      state.loading = false;
      state.error = false;
    }
  },
});

export const { fetchAllProducts, fetchProductsSuccess, fetchProductsFail, fetchProduct, fetchProductSuccess, fetchProductFail, clearProductReducer } = productSlice.actions;

export default productSlice.reducer;