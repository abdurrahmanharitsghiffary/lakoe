import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Location } from "@/types/location";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getStoreAddress = async (storeId: number) => {
  const response = await axios.get<ApiResponse<Location[]>>(
    `/stores/${storeId}/address`
  );

  return response.data;
};

export const getStoreAddressOptions = (storeId: number) => {
  return queryOptions({
    queryKey: ["stores", storeId, "address"],
    queryFn: () => getStoreAddress(storeId),
  });
};

export type UseGetStoreAddressOptions = {
  queryConfig?: QueryConfig<typeof getStoreAddress>;
  storeId: number;
};

export const useGetStoreAddress = (options: UseGetStoreAddressOptions) => {
  return useQuery({
    ...getStoreAddressOptions(options?.storeId),
    ...options?.queryConfig,
  });
};
