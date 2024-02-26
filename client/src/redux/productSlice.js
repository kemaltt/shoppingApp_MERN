import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state) => {
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
  },
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFail } = productSlice.actions;

export default productSlice.reducer;