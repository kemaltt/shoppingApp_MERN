import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from './auth/auth-api'
import authSlice from "./auth/auth-slice";


const persistConfig = {
  user: {
    key: 'user',
    storage: storage,
    blacklist: ['loading', 'error']
  },
  products: {
    key: 'products',
    storage: storage,
    whitelist: []
  },
  cart: {
    key: 'cart',
    storage: storage,
    whitelist: []
  }
}

const rootReducer = combineReducers({
  user: persistReducer(persistConfig.user, authSlice),
  [authApi.reducerPath]: authApi.reducer,
  products: persistReducer(persistConfig.products, productSlice),
  cart: persistReducer(persistConfig.cart, cartSlice)
});

const middlewares = [authApi.middleware];
// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true
});

export const persistor = persistStore(store)