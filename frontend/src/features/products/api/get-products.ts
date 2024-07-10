import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Product } from "@/types/product";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetProductOptions = { q?: string; isActive?: boolean };

export const getProducts = async (options?: GetProductOptions) => {
  const response = await axios.get<ApiResponse<Product[]>>("/products", {
    params: { active: options?.isActive, q: options?.q },
  });

  return response.data;
};

export const getProductsOptions = (options?: GetProductOptions) => {
  return queryOptions({
    queryKey: ["products", options],
    queryFn: () => getProducts(options),
  });
};

export type UseGetProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsOptions>;
  options?: GetProductOptions;
};

export const useGetProducts = (options?: UseGetProductsOptions) => {
  return useQuery({
    ...getProductsOptions(options?.options),
    ...options?.queryConfig,
  });
};
