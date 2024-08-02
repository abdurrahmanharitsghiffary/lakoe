import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { History } from "@/types/biteship/tracking";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getOrderTracking = async (id: string) => {
  const response = await axios.get<ApiResponse<History[]>>(
    `/orders/${id}/trackings`
  );

  return response.data;
};

export const getOrderTrackingOptions = (id: string) => {
  return queryOptions({
    queryKey: ["orders", id, "tracking"],
    queryFn: () => getOrderTracking(id),
  });
};

export type UseGetOrderTrackingOptions = {
  queryConfig?: QueryConfig<typeof getOrderTracking>;
  id: string;
};

export const useGetOrderTracking = (options: UseGetOrderTrackingOptions) => {
  return useQuery({
    ...getOrderTrackingOptions(options.id),
    ...options?.queryConfig,
  });
};
