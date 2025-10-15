import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  tokenType: null,
  user: null, // { id, username, fullName, roleId, email }
  expiresAtUtc: null,
  remember: true,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.tokenType = payload.tokenType ?? "Bearer";
      state.user = {
        id: payload.userId,
        username: payload.username,
        fullName: payload.fullName,
        roleId: payload.roleId,
        email: payload.email,
      };
      state.expiresAtUtc = payload.expiresAtUtc;
      if (typeof payload.remember === "boolean")
        state.remember = payload.remember;
      if (state.remember) localStorage.setItem("auth", JSON.stringify(state));
    },
    loadFromStorage: (state) => {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        state.accessToken = parsed.accessToken;
        state.tokenType = parsed.tokenType;
        state.user = parsed.user;
        state.expiresAtUtc = parsed.expiresAtUtc;
        state.remember = parsed.remember;
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.tokenType = null;
      state.user = null;
      state.expiresAtUtc = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, loadFromStorage, logout } = slice.actions;
export default slice.reducer;
