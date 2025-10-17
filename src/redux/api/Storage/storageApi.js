import { baseApi } from "../baseApi";

export const storageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    presignUpload: build.mutation({
      // body params are query params per backend screenshot
      query: ({ fileName, contentType, prefix }) => ({
        url: `/Storage/presign-upload?FileName=${encodeURIComponent(fileName)}&ContentType=${encodeURIComponent(contentType || "application/octet-stream")}${prefix ? `&Prefix=${encodeURIComponent(prefix)}` : ""}`,
        method: "POST",
      }),
      transformResponse: (response) => response?.data || null,
    }),
    upload: build.mutation({
      query: ({ file, key }) => {
        const form = new FormData();
        if (file) form.append("file", file);
        if (key) form.append("key", key);
        return { url: "/Storage/upload", method: "POST", body: form };
      },
      transformResponse: (response) => response?.data || null,
    }),
  }),
});

export const { usePresignUploadMutation, useUploadMutation } = storageApi;
