import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Product } from "@/types/product";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProducts = async (isActive?: boolean) => {
  const response = await axios.get<ApiResponse<Product[]>>("/products", {
    params: { active: isActive },
  });

  return response.data;
};

export const getProductsOptions = (isActive?: boolean) => {
  return queryOptions({
    queryKey: ["products", isActive],
    queryFn: () => getProducts(isActive),
  });
};

export type UseGetProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsOptions>;
  isActive?: boolean;
};

export const useGetProducts = (options?: UseGetProductsOptions) => {
  return useQuery({
    ...getProductsOptions(options?.isActive),
    ...options?.queryConfig,
  });
};
