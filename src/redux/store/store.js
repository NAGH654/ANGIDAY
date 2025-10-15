import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
