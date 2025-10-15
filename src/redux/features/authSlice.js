import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  tokenType: null,
  user: null, // { id, username, fullName, roleId, email }
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
      // Hỗ trợ cả dạng payload.user lẫn field lẻ
      const u = payload.user || {};
      state.accessToken = payload.accessToken || payload.token || null;
      state.tokenType = payload.tokenType ?? "Bearer";
      state.user = {
        id: payload.userId ?? u.id ?? u.userId ?? null,
        username: payload.username ?? u.username ?? null,
        fullName: payload.fullName ?? u.fullName ?? u.fullname ?? null,
        roleId: payload.roleId ?? u.roleId ?? u.role ?? null,
        email: payload.email ?? u.email ?? null,
      };
      const norm = normalizeExpiry(payload.expiresAtUtc);
      state.expiresAtUtc = norm;
      if (typeof payload.remember === "boolean")
        state.remember = payload.remember;
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
  },
});

export const { setCredentials, loadFromStorage, logout } = slice.actions;
export default slice.reducer;
