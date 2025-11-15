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
  
  // If body is FormData, modify headers to not set Accept
  if (args && typeof args === 'object' && args.body instanceof FormData) {
    const modifiedArgs = {
      ...args,
      prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;
        // Don't set Accept for FormData
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    };
    const res = await rawBaseQuery(modifiedArgs, api, extraOptions);
    if (res?.error?.status === 401 && hadTokenOnRequest) {
      const url = typeof modifiedArgs === "string" ? modifiedArgs : modifiedArgs?.url || "";
      const ignore401 =
        /\/auth\/(login|register|verify|forgot|refresh)/i.test(url) ||
        /\/public\//i.test(url);
      
      const user = api.getState()?.auth?.user;
      const isRestaurantOwner = user?.roleId === 1 || 
                               user?.roleName?.toLowerCase() === "restaurant owner" ||
                               user?.role?.toLowerCase() === "restaurant owner";
      
      const restaurantOwnerIgnoredEndpoints = [
        /\/User\/community\/post/i,
        /\/Post\/user\/review-post/i,
        /\/Post\/user\/liked-posts/i,
      ];
      
      const isRestaurantOwnerEndpoint = isRestaurantOwner && 
        restaurantOwnerIgnoredEndpoints.some(pattern => pattern.test(url));
      
      if (!ignore401 && !isRestaurantOwnerEndpoint) {
        api.dispatch(logout());
        try {
          localStorage.setItem("auth:logout", String(Date.now()));
        } catch {
          // ignore
        }
      }
    }
    return res;
  }
  
  const res = await rawBaseQuery(args, api, extraOptions);

  if (res?.error?.status === 401 && hadTokenOnRequest) {
    const url = typeof args === "string" ? args : args?.url || "";
    const ignore401 =
      /\/auth\/(login|register|verify|forgot|refresh)/i.test(url) ||
      /\/public\//i.test(url);
    
    // Check if user is restaurant owner - don't logout on 401 for certain endpoints
    // that restaurant owners might not have access to
    const user = api.getState()?.auth?.user;
    const isRestaurantOwner = user?.roleId === 1 || 
                             user?.roleName?.toLowerCase() === "restaurant owner" ||
                             user?.role?.toLowerCase() === "restaurant owner";
    
    // Endpoints that restaurant owners might not have access to but shouldn't trigger logout
    const restaurantOwnerIgnoredEndpoints = [
      /\/User\/community\/post/i,
      /\/Post\/user\/review-post/i,
      /\/Post\/user\/liked-posts/i,
    ];
    
    const isRestaurantOwnerEndpoint = isRestaurantOwner && 
      restaurantOwnerIgnoredEndpoints.some(pattern => pattern.test(url));
    
    if (!ignore401 && !isRestaurantOwnerEndpoint) {
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
