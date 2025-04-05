import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../redux/axiosBaseQuery";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        createPost: build.mutation({
            query: (data) => ({
                url: "/posts/createPost",
                method: "POST",
                data
            })
        }),
        getPost: build.query({
            query:()=>({
                url:"/posts/getPost",
                method:"GET",
            })
        }),
        likePost: build.mutation({
            query:(data)=>({
                url:"/posts/likePost",
                method:"POST",
                data
            })
        }),
        getUserPost: build.query({
            query:({userId})=>({
                url:`/posts/getUserPost?userId=${userId}`,
                method:"GET"
            })
        })
    })
})

export const { 
    useCreatePostMutation,
    useGetPostQuery, 
    useLikePostMutation,
    useGetUserPostQuery,
} = postApi;