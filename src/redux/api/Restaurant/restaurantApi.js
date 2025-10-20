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
      query: (restaurantId) => ({ url: `/Post/feedback/${restaurantId}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
    }),
    getRestaurantPosts: build.query({
      query: (restaurantId) => ({ url: `/Post/restaurant-post/${restaurantId}` }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response || [],
    }),
    getRestaurantsByUserTags: build.query({
      query: () => ({ url: "/Restaurant/restaurant-usertag" }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data || [],
      providesTags: ["RestaurantBookmark"],
    }),
  }),
});

export const { useGetRestaurantsByTagsQuery, useGetAllRestaurantsQuery, useGetRestaurantByIdQuery, useGetSignatureFoodsQuery, useGetRestaurantReviewsQuery, useGetRestaurantPostsQuery, useGetRestaurantsByUserTagsQuery } = restaurantApi;
