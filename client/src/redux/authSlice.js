import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.auth = action.payload;
      state.loading = false;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.auth = null;
      state.loading = false;
      state.error = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, registerFail, logout } = authSlice.actions;
export default authSlice.reducer;
