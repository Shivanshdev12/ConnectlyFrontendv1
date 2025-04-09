import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../redux/axiosBaseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getUser: build.query({
            query:({userId})=>({
                url:`/users/getUser?userId=${userId}`,
                method:"GET",
            })
        }),
        coverImage: build.mutation({
            query:(data)=>({
                url:"/users/updatecoverImage",
                method:"POST",
                data
            })
        }),
        registerUser: build.mutation({
            query: (userData) => ({
                url: "/users/register",
                method: "POST",
                data: userData,
            }),
        }),
        loginUser: build.mutation({
            query: (userData)=>({
                url:"/users/login",
                method:"POST",
                data:userData
            })
        }),
        searchUser: build.query({
            query: ({searchTerm})=>({
                url:`/users/searchUser?q=${searchTerm}`,
                method:"GET",
            })
        }),
        getAllUser: build.query({
           query: ()=>({
            url: "/users/getAllUser",
            method: "GET"
           }) 
        }),
        followUser: build.mutation({
            query:(followingId)=>({
                url: `/users/followUser?followingId=${followingId}`,
                method:"POST",
            })
        })
    }),
});

export const { 
    useGetUserQuery,
    useCoverImageMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useSearchUserQuery,
    useGetAllUserQuery,
    useFollowUserMutation,
 } = authApi;
