// src/redux/middlewares/auth401Guard.js
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { baseApi } from "@redux/api/baseApi";
import { logout } from "@redux/features/authSlice";

let loggingOut = false;

function wipeStoragesAndCookies() {
  try {
    // localStorage
    for (const k of Object.keys(localStorage)) {
      if (/(auth|token|accessToken|refreshToken|persist:root)/i.test(k)) {
        localStorage.removeItem(k);
      }
    }
    // sessionStorage
    for (const k of Object.keys(sessionStorage)) {
      if (/(auth|token|accessToken|refreshToken)/i.test(k)) {
        sessionStorage.removeItem(k);
      }
    }
    // cookies (best effort)
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (!name) return;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    });
  } catch {}
}

export const auth401Guard = (store) => (next) => (action) => {
  // Bắt toàn bộ lỗi từ RTK Query endpoints
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status ?? action.error?.status;
    if ([401, 403, 419, 440, 498].includes(status)) {
      if (!loggingOut) {
        loggingOut = true;
        // 1) reset api cache + auth slice
        store.dispatch(baseApi.util.resetApiState());
        store.dispatch(logout());
        // 2) dọn sạch storage/cookie
        wipeStoragesAndCookies();
        // 3) phát tín hiệu cho các tab khác
        try {
          localStorage.setItem("auth:logout", String(Date.now()));
        } catch {}
        // 4) điều hướng về home
        window.location.replace("/");
      }
    }
  }
  return next(action);
};
