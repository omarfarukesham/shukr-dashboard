import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from '../feature/toggle/toggleSlice'
import { apiSlice } from '@/feature/product/productSlice'
import { authApi } from '@/feature/auth/authSlice'
import { homeContentApi } from '@/feature/homescreen/homeSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeContentApi.reducerPath]: homeContentApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware, homeContentApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch