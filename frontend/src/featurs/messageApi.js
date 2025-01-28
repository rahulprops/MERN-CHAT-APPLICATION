import apiSlice from "./apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserSidebar: builder.query({
      query: () => ({
        url: "/message/user",
        method: "GET",
      }),
      transformResponse: (data) => {
        return data.data;
      },
    }),
    getMessage: builder.query({
      query: (receverId) => ({
        url: `/message/get/${receverId}`,
        method: "GET",
      }),
      transformResponse: (data) => {
        return data.data;
      },
    }),
    sendMessage: builder.mutation({
      query: ({ receverId, text }) => ({
        url: `/message/send/${receverId}`,
        method: "POST",
        body:{text}
      }),
      
    }),
  }),
});
export const {
  useGetUserSidebarQuery,
  useGetMessageQuery,
  useSendMessageMutation,
} = messageApi;
