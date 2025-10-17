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
  }),
});

export const {
  useGetTagsQuery,
  useGetMyTagsQuery, // dùng nếu server hỗ trợ
  useChooseTagsMutation,
} = tagApi;
