import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./auth/auth-slice";
import { authApi } from './auth/auth-api'
import { favApi } from "./favorite/favorite-api";
import favoriteSlice from "./favorite/favorite-slice";


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
  },
  favorite: {
    key: 'favorite',
    storage: storage,
    whitelist: []
  }
}

const rootReducer = combineReducers({
  user: persistReducer(persistConfig.user, authSlice),
  favorite: persistReducer(persistConfig.favorite, favoriteSlice),
  [authApi.reducerPath]: authApi.reducer,
  [favApi.reducerPath]: favApi.reducer,
  products: persistReducer(persistConfig.products, productSlice),
  cart: persistReducer(persistConfig.cart, cartSlice)
});

const middlewares = [authApi.middleware, favApi.middleware];
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