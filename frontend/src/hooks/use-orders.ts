import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (storeId: string) => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", storeId],
    queryFn: () => getOrders(storeId),
  });

  const getOrders = async (id: string) => {
    try {
      const response = await axios.get<ApiResponse<Order[]>>(
        `/stores/${id}/orders`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { orders, isLoading, error };
};
