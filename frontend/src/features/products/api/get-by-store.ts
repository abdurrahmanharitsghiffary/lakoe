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
  storeId: number;
};

export const getProductsByStore = async (options: GetProductOptions) => {
  const params: Record<string, any> = {};

  for (const [key, value] of Object.entries(options ?? {})) {
    if (key === "active") {
      params[key] = value;
      continue;
    }
    if (value) params[key] = value;
  }

  const response = await axios.get<ApiResponse<Product[]>>(
    `/stores/${options?.storeId}/products`,
    {
      params,
    }
  );

  return response.data;
};

export const getProductsByStoreOptions = (options: GetProductOptions) => {
  return queryOptions({
    queryKey: ["products", options, "stores"],
    queryFn: () => getProductsByStore(options),
  });
};

export type UseGetProductsByStoreOptions = {
  queryConfig?: QueryConfig<typeof getProductsByStore>;
  options: GetProductOptions;
};

export const useGetProductsByStore = (
  options: UseGetProductsByStoreOptions
) => {
  return useQuery({
    ...getProductsByStoreOptions(options?.options),
    ...options?.queryConfig,
  });
};
