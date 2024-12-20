import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Product } from "@/types/product";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetProductOptions = {
  q?: string;
  active?: boolean;
  sort_by?: string;
  categories?: string;
};

export const getProducts = async (options?: GetProductOptions) => {
  const params: Record<string, any> = {};

  for (const [key, value] of Object.entries(options ?? {})) {
    if (key === "active") {
      params[key] = value;
      continue;
    }
    if (value) params[key] = value;
  }

  const response = await axios.get<ApiResponse<Product[]>>("/products", {
    params,
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
