import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/types/query";
import { SingleProduct } from "@/types/single-product";

export const getProductApi = async (id: number) => {
  const response = await axios.get<ApiResponse<SingleProduct>>(
    `/products/${id}`
  );
  return response.data;
};

export const getProductOptions = (id: number) => {
  return queryOptions({
    queryKey: ["products", id],
    queryFn: () => getProductApi(id),
  });
};

export type UsegetProductOptions = {
  queryConfig?: QueryConfig<typeof getProductOptions>;
  productId: number;
};

export const useGetProduct = (options: UsegetProductOptions) => {
  return useQuery({
    ...getProductOptions(options?.productId),
    ...options?.queryConfig,
  });
};
