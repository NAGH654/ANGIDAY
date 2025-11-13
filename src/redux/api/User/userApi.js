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
    // Alternative endpoint if the above doesn't work
    getUserCommunityPosts: build.query({
      query: (userId) => ({ url: `/User/${userId}/community-posts` }),
      providesTags: ["Auth"],
      transformResponse: (response) => {
        const d = response?.data;
        if (!d) return [];
        return Array.isArray(d) ? d : [d];
      },
    }),
    getMyReviews: build.query({
      query: () => ({ url: "/Post/user/review-post" }),
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
    getLikedPosts: build.query({
      query: () => ({ url: "/Post/user/liked-posts" }),
      providesTags: ["PostLike"],
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
    createCommunityPost: build.mutation({
      query: (body) => ({
        url: "/Post/user/create-community-post",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    createReview: build.mutation({
      query: (body) => ({
        url: "/Post/user/create-review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `/Post/delete/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post", "Auth"],
    }),
    togglePostLike: build.mutation({
      query: (postId) => ({
        url: `/Post/like/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Post", "PostLike"],
    }),

    // Leaderboard: top users by total likes
    getTopUsersByLikes: build.query({
      query: (topCount = 10) => ({
        url: "/Post/top-users-by-likes",
        params: { topCount },
      }),
      transformResponse: (response) => {
        const payload = Array.isArray(response)
          ? response
          : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
      providesTags: ["Auth"],
    }),

    // Community stats: totals of members, restaurants, posts, likes
    getCommunityStats: build.query({
      query: () => ({ url: "/Post/community-stats-report" }),
      transformResponse: (response) => {
        const d = response?.data || {};
        return {
          totalCustomers: Number(d.totalCustomers) || 0,
          totalRestaurants: Number(d.totalRestaurants) || 0,
          totalPosts: Number(d.totalPosts) || 0,
          totalLikes: Number(d.totalLikes) || 0,
        };
      },
      providesTags: ["Auth"],
    }),

    // Premium payment info (QR, content, amount, bank info)
    getPremiumInfo: build.query({
      query: () => ({ url: "/Payments/premium-info" }),
      transformResponse: (response) => response?.data || response,
      providesTags: ["Auth"],
    }),

    // User's selected tags
    getUserSelectedTags: build.query({
      query: () => ({ url: "/UserTag/user-tag" }),
      transformResponse: (response) => {
        const payload = Array.isArray(response) ? response : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetMyCommunityPostsQuery,
  useGetUserCommunityPostsQuery,
  useGetMyReviewsQuery,
  useGetBookmarkedPostsQuery,
  useGetLikedPostsQuery,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useGetBookmarkedRestaurantsQuery,
  useBookmarkRestaurantMutation,
  useUnbookmarkRestaurantMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useCreateCommunityPostMutation,
  useCreateReviewMutation,
  useDeletePostMutation,
  useTogglePostLikeMutation,
  useGetTopUsersByLikesQuery,
  useGetCommunityStatsQuery,
  useGetPremiumInfoQuery,
  useLazyGetPremiumInfoQuery,
  useGetUserSelectedTagsQuery,
  useLazyGetUserSelectedTagsQuery,
} = userApi;
