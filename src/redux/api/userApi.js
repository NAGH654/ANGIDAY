import { baseApi } from "./baseApi";

// User-related endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({ url: "/User/me" }),
      providesTags: ["Auth"],
      transformResponse: (response) => {
        // API shape per screenshot: { isSuccess, statusCode, message, data: {...} }
        // Safely unwrap to return data or null
        return response?.data || null;
      },
    }),
    getMyCommunityPosts: build.query({
      query: () => ({ url: "/User/community/post" }),
      providesTags: ["Auth"],
      transformResponse: (response) => {
        const d = response?.data;
        if (!d) return [];
        return Array.isArray(d) ? d : [d];
      },
    }),
    getBookmarkedPosts: build.query({
      query: () => ({ url: "/Bookmark/posts" }),
      providesTags: ["Auth"],
      transformResponse: (response) => {
        // API may return either { data: [...] } or a raw array [...]
        const payload = Array.isArray(response)
          ? response
          : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
    }),
    bookmarkPost: build.mutation({
      query: (postId) => ({
        url: `/Bookmark/post/${postId}`,
        method: "POST",
      }),
    }),
    unbookmarkPost: build.mutation({
      query: (postId) => ({
        url: `/Bookmark/posts/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useGetMyCommunityPostsQuery, useGetBookmarkedPostsQuery, useBookmarkPostMutation, useUnbookmarkPostMutation } = userApi;


