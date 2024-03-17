import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;

    },
    getCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;

    },
    addToCartSuccess: (state, action) => {
      state.cart = [...state.cart, action.payload];
      state.error = null;
      state.loading = false;
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action) => {
      state.cart = action.payload.products;
      state.loading = false;
      state.error = null;
    },
    removeFromCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
      state.loading = false;
      state.error = null;

    },
  },
});

export const { getCartStart, getCartSuccess, getCartFail, addToCartStart, addToCartSuccess, addToCartFail, removeFromCart, clearCart, removeFromCartSuccess, removeFromCartFail } = cartSlice.actions;

export default cartSlice.reducer;