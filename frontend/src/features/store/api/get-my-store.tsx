import { axios } from "@/lib/axios";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api-response";

export const getMyStore = async () => {
  const response = await axios.get<ApiResponse<any>>("/me/stores");

  return response.data;
};

export const getMyStoreOptions = () => {
  return queryOptions({
    queryKey: ["me", "store"],
    queryFn: () => getMyStore(),
  });
};

export const useGetMyStore = () => {
  return useQuery({
    ...getMyStoreOptions(),
  });
};
