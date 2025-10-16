// src/lib/api.js
import axios, { AxiosHeaders } from "axios";
import { cleanLogout } from "@utils/cleanLogout";

let _getToken = null; // () => string|null
let _onUnauthorized = null; // () => void

export const connectTokenSource = (fn) => {
  _getToken = fn;
};
export const connectUnauthorizedHandler = (fn) => {
  _onUnauthorized = fn;
};

const BASE_URL =
  (import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL) || "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Attach token + headers
api.interceptors.request.use((config) => {
  const method = (config.method ?? "get").toLowerCase();
  const headers = AxiosHeaders.from(config.headers);

  headers.set("Accept", "application/json, text/plain, */*");
  if (["post", "put", "patch"].includes(method) && !headers.getContentType()) {
    headers.set("Content-Type", "application/json");
  }

  const token =
    (_getToken && _getToken()) ||
    (() => {
      try {
        const raw =
          localStorage.getItem("auth") || sessionStorage.getItem("auth");
        return raw ? JSON.parse(raw)?.accessToken : null;
      } catch {
        return null;
      }
    })();

  if (token) headers.set("Authorization", `Bearer ${token}`);
  config.headers = headers;
  return config;
});

// 401 guard
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const url = error?.config?.url || "";
      const ignore =
        /\/auth\/(login|register|verify|forgot|refresh)/i.test(url) ||
        /\/public\//i.test(url);
      if (!ignore && _onUnauthorized) _onUnauthorized();
    }
    return Promise.reject(error);
  }
);

// gọi ở store sau khi tạo store
export function setupApiWithStore(store, { redirect = "/" } = {}) {
  connectTokenSource(() => store.getState()?.auth?.accessToken || null);
  connectUnauthorizedHandler(() => {
    cleanLogout(store.dispatch, { redirect }); // replace("/") => không query lạ
  });
}
