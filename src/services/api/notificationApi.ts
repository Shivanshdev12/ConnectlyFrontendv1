import { createApi } from "@reduxjs/toolkit/query/react"; 
import axiosBaseQuery from "../redux/axiosBaseQuery";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (build)=>({
        getNotification: build.mutation({
            query:(userId)=>({
                url: "/notifications/getNotifications",
                method:"POST",
                data: userId
            })
        }),
    })
})

export const {
    useGetNotificationMutation
} = notificationApi;