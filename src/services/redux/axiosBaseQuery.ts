import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const getConfig = (): AxiosRequestConfig => {
    return {
        headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`
        },
        withCredentials:true,
        data: {}
    }
}

const axiosBaseQuery = (): BaseQueryFn<{ url: string; method: AxiosRequestConfig['method']; data?: any },
    unknown,
    unknown
> => async ({ url, method, data }) => {
    try {
        const options = getConfig();
        if (method === "POST") {
            const res = await axios.post(import.meta.env.VITE_BACKEND_API_URI + url, data, options);
            return { data: res?.data }
        }
        else if (method === "GET") {
            const res = await axios.get(import.meta.env.VITE_BACKEND_API_URI + url, options);
            return { data: res?.data }
        }
        return {};
    }
    catch (axiosError) {
        let err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message
            }
        }
    }
}

export default axiosBaseQuery;
