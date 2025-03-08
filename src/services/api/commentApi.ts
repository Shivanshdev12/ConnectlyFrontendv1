import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../redux/axiosBaseQuery";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (build)=>({
        addComment:build.mutation({
            query:(data)=>({
                url:"/comments/addComment",
                method:"POST",
                data
            })
        })
    })
})

export const {
    useAddCommentMutation,
} = commentApi;