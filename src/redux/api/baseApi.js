import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

// Dev: dùng proxy '/api' ; Prod: dùng env hoặc fallback Railway
export const BASE_URL =
  (import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL) ||
  "https://angiday-production-c5c0.up.railway.app";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // credentials: "include", // bật nếu dùng cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    headers.set("Accept", "application/json"); // KHÔNG set cứng Content-Type
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const res = await rawBaseQuery(args, api, extraOptions);
  if (res?.error?.status === 401) {
    api.dispatch(logout());
  }
  return res;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
