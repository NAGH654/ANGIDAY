import { baseApi } from "../baseApi";

/** RTK Query endpoints cho auth (JS thuần) */
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      // body: { username, email, password, fullName, gender, dateOfBirth }
      query: (body) => ({
        url: "/User/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginWithUsername: build.mutation({
      // body: { username, password }
      query: (body) => ({
        url: "/User/login-with-username",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginWithUsernameMutation } = authApi;
