// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/authSlice";
import chatReducer from "../features/chatSlice";
import { auth401Guard } from "../middlewares/auth401Guard";
import { setupListeners } from "@reduxjs/toolkit/query";
import { setupApiWithStore } from "@lib/api"; 

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
      auth401Guard // guard nằm sau api.middleware
    ),
});

setupListeners(store.dispatch);
setupApiWithStore(store, { redirect: "/" }); 
