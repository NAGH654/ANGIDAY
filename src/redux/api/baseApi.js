import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "@redux/features/authSlice";

export const BASE_URL =
  (import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL) ||
  "https://angiday-production-c5c0.up.railway.app";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    headers.set("Accept", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const hadTokenOnRequest = !!api.getState()?.auth?.accessToken;
  const res = await rawBaseQuery(args, api, extraOptions);

  if (res?.error?.status === 401 && hadTokenOnRequest) {
    const url = typeof args === "string" ? args : args?.url || "";
    const ignore401 =
      /\/auth\/(login|register|verify|forgot|refresh)/i.test(url) ||
      /\/public\//i.test(url);
    if (!ignore401) {
      api.dispatch(logout());
      try {
        localStorage.setItem("auth:logout", String(Date.now()));
      } catch {
        // ignore
      }
    }
  }
  return res;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "Tag", "RestaurantBookmark", "Chat", "ChatMessages"],
  endpoints: () => ({}),
});
