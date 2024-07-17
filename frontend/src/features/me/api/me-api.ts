import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Profile } from "@/types/me";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getMe = async () => {
  const response = await axios.get<ApiResponse<Profile>>("/me");

  return response.data;
};

export const getMeOptions = () => {
  return queryOptions({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
};

export const useGetMe = () => {
  return useQuery({
    ...getMeOptions(),
    retry: 0,
  });
};
