import { baseApi } from "../baseApi";

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRestaurantsByTags: build.query({
      // arg: string[] of tag names
      query: (tagNames = []) => {
        const qs = new URLSearchParams();
        (tagNames || []).forEach((n) => qs.append("tagNames", n));
        return { url: `/Restaurant/filter-restaurant?${qs.toString()}` };
      },
      // keep cache so back/forward doesn't refetch instantly
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantBookmark"], // reuse for sync per bookmark changes
    }),
    getAllRestaurants: build.query({
      query: () => ({ url: "/Restaurant/all-restaurant" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantBookmark"],
    }),
    getRestaurantById: build.query({
      query: (id) => ({ url: `/Restaurant/${id}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || null,
    }),
    getSignatureFoods: build.query({
      query: (restaurantId) => ({ url: `/Restaurant/signaturefood/${restaurantId}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
    }),
    getRestaurantReviews: build.query({
      query: (restaurantId) => ({ url: `/Post/restaurant-feedback/${restaurantId}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: (result, error, restaurantId) => [
        { type: "Post", id: `restaurant-feedback-${restaurantId}` },
      ],
    }),
    getRestaurantPosts: build.query({
      query: (restaurantId) => ({ url: `/Post/restaurant-post/${restaurantId}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response || [],
    }),
    getRestaurantPostsByRestaurantId: build.query({
      query: (restaurantId) => ({ url: `/Post/user/restaurant/${restaurantId}/post` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => {
        const payload = Array.isArray(response)
          ? response
          : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
      providesTags: ["RestaurantOwnerPosts"],
    }),
    getRestaurantsByUserTags: build.query({
      query: () => ({ url: "/Restaurant/restaurant-usertag" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantBookmark"],
    }),
    getRestaurantRecommendations: build.query({
      query: () => ({ url: "/Restaurant/restaurant-recommendation" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantBookmark"],
    }),
    getRestaurantOwnerInformation: build.query({
      query: () => ({ url: "/Restaurant/owner-information" }),
      transformResponse: (response) => response?.data || null,
      providesTags: ["RestaurantOwnerInformation"],
    }),
    getRestaurantOwnerPosts: build.query({
      query: () => ({ url: "/Post/restaurant-owner-post" }),
      transformResponse: (response) => {
        const payload = Array.isArray(response)
          ? response
          : response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
      providesTags: ["RestaurantOwnerPosts"],
    }),
    getRestaurantOwnerReviews: build.query({
      query: () => ({ url: "/Post/restaurant/owner-review-post" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantOwnerReviews"],
    }),
    getMyRestaurantSignatureFoods: build.query({
      query: () => ({ url: "/SignatureFood/my-restaurant" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["SignatureFoods"],
    }),
    createSignatureFood: build.mutation({
      query: (body) => ({
        url: "/SignatureFood/create-food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SignatureFoods"],
    }),
    uploadSignatureFoodImage: build.mutation({
      query: (formData) => ({
        url: "/SignatureFood/upload-image",
        method: "POST",
        body: formData,
      }),
    }),
    updateSignatureFood: build.mutation({
      query: ({ foodId, body }) => ({
        url: `/SignatureFood/${foodId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SignatureFoods"],
    }),
    deleteSignatureFood: build.mutation({
      query: (foodId) => ({
        url: `/SignatureFood/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SignatureFoods"],
    }),
    updateRestaurantProfile: build.mutation({
      query: (body) => ({
        url: "/Restaurant/me/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RestaurantOwnerInformation"],
    }),
    updateRestaurantImage: build.mutation({
      query: (formData) => ({
        url: "/Restaurant/restaurant/image",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["RestaurantOwnerInformation"],
    }),
    searchRestaurant: build.query({
      query: ({ restaurantName, signatureFoodName }) => {
        const params = new URLSearchParams();
        if (restaurantName) params.append("restaurantName", restaurantName);
        if (signatureFoodName) params.append("signatureFoodName", signatureFoodName);
        return { url: `/Restaurant/search-restaurant?${params.toString()}` };
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        // API might return object or array
        if (Array.isArray(response)) return response;
        if (response?.data) {
          return Array.isArray(response.data) ? response.data : [response.data];
        }
        // If single object, wrap in array
        return response ? [response] : [];
      },
    }),
  }),
});

export const {
  useGetRestaurantsByTagsQuery,
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useGetSignatureFoodsQuery,
  useGetRestaurantReviewsQuery,
  useGetRestaurantPostsQuery,
  useGetRestaurantPostsByRestaurantIdQuery,
  useGetRestaurantsByUserTagsQuery,
  useGetRestaurantRecommendationsQuery,
  useGetRestaurantOwnerInformationQuery,
  useGetRestaurantOwnerPostsQuery,
  useGetRestaurantOwnerReviewsQuery,
  useGetMyRestaurantSignatureFoodsQuery,
  useCreateSignatureFoodMutation,
  useUpdateSignatureFoodMutation,
  useDeleteSignatureFoodMutation,
  useUploadSignatureFoodImageMutation,
  useUpdateRestaurantProfileMutation,
  useUpdateRestaurantImageMutation,
  useSearchRestaurantQuery,
} = restaurantApi;
