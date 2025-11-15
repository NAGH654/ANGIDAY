// src/redux/api/tagApi.js
import { baseApi } from "../baseApi";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query({
      query: () => ({ url: "/Tag" }),
      providesTags: ["Tag"],
    }),
    // ⤵️ lấy tag của user theo API thực tế
    getMyTags: build.query({
      query: () => ({ url: "/UserTag/user-tag" }),
    }),
    chooseTags: build.mutation({
      // body: [{ tagName: string, isDeleted: boolean }]
      query: (body) => ({
        url: "/UserTag/choose-tag",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tag"],
    }),
    // Restaurant Tag endpoints (reuse the same GET /Tag list)
    getRestaurantTags: build.query({
      query: () => ({ url: "/Tag" }),
      providesTags: ["Tag"],
      transformResponse: (response) => {
        // API returns { isSuccess, statusCode, message, data: [...] }
        const payload = response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
    }),
    getMyRestaurantTags: build.query({
      query: () => ({ url: "/RestaurantTag/restaurant-tag" }),
      transformResponse: (response) => {
        const payload = response?.data ?? [];
        return Array.isArray(payload) ? payload : [payload];
      },
    }),
    chooseRestaurantTags: build.mutation({
      // body: [{ tagName: string }]
      query: (body) => ({
        url: "/RestaurantTag/choose-tag",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetMyTagsQuery, // dùng nếu server hỗ trợ
  useChooseTagsMutation,
  useGetRestaurantTagsQuery,
  useGetMyRestaurantTagsQuery,
  useChooseRestaurantTagsMutation,
} = tagApi;
