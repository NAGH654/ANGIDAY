import { baseApi } from "../baseApi";

// Chat-related endpoints  
export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get messages (backend handles user's conversation automatically)
    getChatMessages: build.query({
      query: ({ limit = 100 } = {}) => ({
        url: `/Chat/messages?limit=${limit}`,
      }),
      transformResponse: (response) => {
        console.log("🔍 getChatMessages API Response:", response);
        return response || [];
      },
      providesTags: ["ChatMessages"],
    }),

    // Send a message (backend handles user's conversation automatically)
    sendChatMessage: build.mutation({
      query: ({ content, provider = "gemini" }) => ({
        url: `/Chat/send`,
        method: "POST",
        body: {
          content,
          provider,
        },
      }),
      transformResponse: (response) => {
        console.log("🔍 sendChatMessage API Response:", response);
        return response || null;
      },
      invalidatesTags: ["ChatMessages"],
    }),
  }),
});

export const {
  useGetChatMessagesQuery,
  useSendChatMessageMutation,
} = chatApi;