import { baseApi } from "../baseApi";

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
    // Restaurants bookmark
    getBookmarkedRestaurants: build.query({
      query: () => ({ url: "/Bookmark/restaurants" }),
      providesTags: ["RestaurantBookmark"],
      transformResponse: (response) => {
        const payload = Array.isArray(response) ? response : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
    }),
    bookmarkRestaurant: build.mutation({
      query: (restaurantId) => ({
        url: `/Bookmark/restaurants/${restaurantId}`,
        method: "POST",
      }),
      invalidatesTags: ["RestaurantBookmark"],
    }),
    unbookmarkRestaurant: build.mutation({
      query: (restaurantId) => ({
        url: `/Bookmark/restaurants/${restaurantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RestaurantBookmark"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: "/User/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateAvatar: build.mutation({
      query: (formData) => ({
        url: "/User/me/avatar",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useGetMyCommunityPostsQuery,
  useGetBookmarkedPostsQuery,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useGetBookmarkedRestaurantsQuery,
  useBookmarkRestaurantMutation,
  useUnbookmarkRestaurantMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} = userApi;
