// src/redux/api/tagApi.js
import { baseApi } from "../baseApi";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query({
      query: () => ({ url: "/Tag" }),
      providesTags: ["Tag"],
    }),
    // ⤵️ nếu backend có endpoint kiểm tra tag của user
    getMyTags: build.query({
      query: () => ({ url: "/UserTag/me" }), // đổi path nếu API khác
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
  }),
});

export const {
  useGetTagsQuery,
  useGetMyTagsQuery, // dùng nếu server hỗ trợ
  useChooseTagsMutation,
} = tagApi;
