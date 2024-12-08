import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Profile } from "@/types/me";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/types/query";

export const getMe = async () => {
  const response = await axios.get<ApiResponse<Profile>>("/me");
  console.log(response, "RES");
  return response.data;
};

export const getMeOptions = () => {
  return queryOptions({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
};

export type UseGetMeOptions = {
  queryConfig?: QueryConfig<typeof getMeOptions>;
};

export const useGetMe = (options?: UseGetMeOptions) => {
  return useQuery({
    ...getMeOptions(),
    ...options?.queryConfig,
  });
};
