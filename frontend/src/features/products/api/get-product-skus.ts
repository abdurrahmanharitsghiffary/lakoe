import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { SKU } from "@/types/sku";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProductSkus = async (productId: number) => {
  const response = await axios.get<ApiResponse<SKU[]>>(
    `/products/${productId}/skus`
  );

  return response.data;
};

export const getProductSkusOptions = (productId: number) => {
  return queryOptions({
    queryKey: ["products", productId, "skus"],
    queryFn: () => getProductSkus(productId),
  });
};

export type UseGetProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductSkus>;
  productId: number;
};

export const useGetProductSkus = (options: UseGetProductsOptions) => {
  return useQuery({
    ...getProductSkusOptions(options?.productId),
    ...options?.queryConfig,
  });
};
