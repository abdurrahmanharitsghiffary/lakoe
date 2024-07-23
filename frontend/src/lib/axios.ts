import { useSession } from "@/hooks/use-session";
import { ApiResponse } from "@/types/api-response";
import xios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BASE_API_URL}/api/v1`;

export const baseAxios = xios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axios = xios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useSession.getState().token}`,
  },
});

axios.interceptors.request.use((config) => {
  const authToken = useSession.getState().token;
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const originalRequest = err?.config as InternalAxiosRequestConfig<any> & {
      _retry: boolean;
    };
    const errorResponse = err?.response?.data as ApiResponse<null>;
    if (errorResponse?.statusCode === 403 && !originalRequest?._retry) {
      const token = useSession.getState().token;
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return baseAxios(originalRequest);
      }
    }
    return Promise.reject(err);
  }
);
