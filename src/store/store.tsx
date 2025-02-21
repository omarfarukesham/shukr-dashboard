import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from '../feature/toggle/toggleSlice'
import { apiSlice } from '@/feature/product/productSlice'
import { authApi } from '@/feature/auth/authSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch