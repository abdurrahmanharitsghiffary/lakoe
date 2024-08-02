import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Order } from "@/types/order";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getOrder = async (id: string) => {
  const response = await axios.get<ApiResponse<Order>>(`/orders/${id}`);

  return response.data;
};

export const getOrderOptions = (id: string) => {
  return queryOptions({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
};

export type UseGetOrderOptions = {
  queryConfig?: QueryConfig<typeof getOrder>;
  id: string;
};

export const useGetOrder = (options: UseGetOrderOptions) => {
  return useQuery({
    ...getOrderOptions(options.id),
    ...options?.queryConfig,
  });
};
