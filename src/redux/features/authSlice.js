// src/redux/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  tokenType: null,
  user: null, // { id, username, fullName, roleId, email, emailVerified }
  expiresAtUtc: null, // ISO string
  remember: true,
};

function normalizeExpiry(input) {
  if (!input) return null;
  const t = new Date(input).getTime();
  const now = Date.now();
  // > 2001-01-01 và phải cách hiện tại ít nhất 30s
  if (Number.isFinite(t) && t > 978307200000 && t > now + 30_000) {
    return new Date(t).toISOString();
  }
  return null;
}

function persistAuth(state) {
  const data = {
    accessToken: state.accessToken,
    tokenType: state.tokenType,
    user: state.user,
    expiresAtUtc: state.expiresAtUtc,
    remember: state.remember,
  };
  try {
    if (state.remember) {
      localStorage.setItem("auth", JSON.stringify(data));
      sessionStorage.removeItem("auth");
    } else {
      sessionStorage.setItem("auth", JSON.stringify(data));
      localStorage.removeItem("auth");
    }
  } catch {}
}

function readPersisted() {
  try {
    const raw = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      // Merge user cũ (nếu có) + user từ payload (nếu có)
      const u = payload?.user || {};
      const merged = { ...(state.user || {}), ...(u || {}) };

      state.accessToken = payload?.accessToken || payload?.token || null;
      state.tokenType = payload?.tokenType ?? "Bearer";

      state.user = {
        ...merged,
        id: payload?.userId ?? merged.id ?? merged.userId ?? null,
        username: payload?.username ?? merged.username ?? null,
        fullName:
          payload?.fullName ?? merged.fullName ?? merged.fullname ?? null,
        roleId: payload?.roleId ?? merged.roleId ?? merged.role ?? null,
        email: payload?.email ?? merged.email ?? null,
        // chuẩn hóa các biến thể từ BE
        emailVerified:
          payload?.emailVerified ??
          merged.emailVerified ??
          merged.emailConfirmed ??
          merged.isEmailConfirmed ??
          false,
        // Lưu thêm các field khác từ API
        isCharged: payload?.isCharged ?? merged.isCharged ?? false,
        roleName: payload?.roleName ?? merged.roleName ?? merged.role ?? null,
        role: payload?.role ?? merged.role ?? merged.roleName ?? null,
      };

      const norm = normalizeExpiry(payload?.expiresAtUtc);
      state.expiresAtUtc = norm;

      if (typeof payload?.remember === "boolean") {
        state.remember = payload.remember;
      }

      persistAuth(state);
    },

    loadFromStorage: (state) => {
      const parsed = readPersisted();
      if (parsed) {
        state.accessToken = parsed.accessToken ?? null;
        state.tokenType = parsed.tokenType ?? null;
        state.user = parsed.user ?? null;
        state.expiresAtUtc = normalizeExpiry(parsed.expiresAtUtc);
        state.remember =
          typeof parsed.remember === "boolean" ? parsed.remember : true;
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.tokenType = null;
      state.user = null;
      state.expiresAtUtc = null;
      try {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
      } catch {}
    },

    // Tiện ích: set đã xác thực email
    markEmailVerified: (state) => {
      if (state.user) {
        state.user.emailVerified = true;
        persistAuth(state);
      }
    },
  },
});

export const { setCredentials, loadFromStorage, logout, markEmailVerified } =
  slice.actions;
export default slice.reducer;

// selectors
export const selectAuth = (s) => s.auth;
export const selectIsLoggedIn = (s) => !!s.auth.accessToken;
export const selectIsEmailVerified = (s) => !!s.auth.user?.emailVerified;
