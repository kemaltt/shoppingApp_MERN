import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartStart: (state) => {
      state.loading = true;
    },
    getCartSuccess: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    },
    getCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCartStart: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCart: (state) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    removeFromCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { getCartStart, getCartSuccess, getCartFail, addToCartStart, addToCartSuccess, addToCartFail, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;