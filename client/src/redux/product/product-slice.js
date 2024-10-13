import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "./product-api";

const initialState = {
  products: [],
  product: {}
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addMatcher(productApi.endpoints.getProductById.matchFulfilled, (state, action) => {
      state.product = action.payload;
    });
    builder.addMatcher(productApi.endpoints.updateProductById.matchFulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default productSlice.reducer;