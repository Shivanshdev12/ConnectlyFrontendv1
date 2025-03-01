import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../redux/axiosBaseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
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
        })
    }),
});

export const { 
    useRegisterUserMutation,
    useLoginUserMutation,
 } = authApi;
