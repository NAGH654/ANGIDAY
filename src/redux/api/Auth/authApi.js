// src/redux/api/Auth/authApi.js
import { baseApi } from "../baseApi";
import { setCredentials } from "../../features/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: "/User/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    loginWithUsername: build.mutation({
      query: (body) => ({
        url: "/User/login-with-username",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    loginWithGoogle: build.mutation({
      query: (body) => ({
        url: "/User/login-by-google-id-token",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerRestaurant: build.mutation({
      query: (body) => ({
        url: "/User/register-restaurant",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: build.query({
      query: (token) => ({ url: "/User/verify-email", params: { token } }),
      providesTags: ["Auth"],
      async onQueryStarted(token, { getState, dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const s = getState();
          const u = s?.auth?.user;
          if (u && data?.isSuccess) {
            dispatch(
              setCredentials({
                accessToken: s.auth.accessToken,
                tokenType: s.auth.tokenType,
                expiresAtUtc: s.auth.expiresAtUtc,
                remember: s.auth.remember,
                user: { ...u, emailVerified: true },
              })
            );
          }
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginWithUsernameMutation,
  useLoginWithGoogleMutation,
  useRegisterRestaurantMutation,
  useVerifyEmailQuery,
} = authApi;
