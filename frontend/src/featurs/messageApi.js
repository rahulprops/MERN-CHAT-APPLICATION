import apiSlice from "./apiSlice";
import { setMessage } from "./messageSlice";

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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage(data)); // Ensure data is stored correctly
        } catch (err) {
          console.log("Error fetching messages:", err);
        }
      },
      providesTags:["refess"]
      
    }),
    sendMessage: builder.mutation({
      query: ({ receverId, text }) => ({
        url: `/message/send/${receverId}`,
        method: "POST",
        body:{text}
      }),
      invalidatesTags:["refess"]
      
    }),
  }),
});
export const {
  useGetUserSidebarQuery,
  useGetMessageQuery,
  useSendMessageMutation,
} = messageApi;
