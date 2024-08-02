import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getItemCountApi = async (collectionId: string) => {
  const response = await axios.get<ApiResponse<{ count: number }>>(
    `/cart-collections/${collectionId}/counts`
  );

  return response.data;
};

export const getItemCountOptions = (collectionId: string) => {
  return queryOptions({
    queryKey: ["cartItems", collectionId, "counts"],
    queryFn: () => getItemCountApi(collectionId),
  });
};

export const useGetCartItemsCount = (collectionId: string) => {
  return useQuery({
    ...getItemCountOptions(collectionId),
  });
};
