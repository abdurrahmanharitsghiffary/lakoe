import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getCategories = async (q?: string) => {
  const response = await axios.get<ApiResponse<string[]>>("/categories", {
    params: { q },
  });

  return response.data;
};

export const getCategoriesOptions = (q?: string) => {
  return queryOptions({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });
};

export type UseGetProductsOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesOptions>;
  q?: string;
};

export const useGetCategories = (options?: UseGetProductsOptions) => {
  return useQuery({
    ...getCategoriesOptions(options?.q ?? ""),
    ...options?.queryConfig,
  });
};
