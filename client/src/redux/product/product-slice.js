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
    builder.addMatcher(productApi.endpoints.addProduct.matchFulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addMatcher(productApi.endpoints.deleteProduct.matchFulfilled, (state, action) => {
     state.products = state.products.filter((product) => product._id !== action.payload._id);
    });
    builder.addMatcher(productApi.endpoints.editProduct.matchFulfilled, (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
    });
  },
});

export default productSlice.reducer;