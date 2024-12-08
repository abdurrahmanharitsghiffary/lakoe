import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const rejectOrderApi = (orderId: string) => {
  return axios.post(`/orders/${orderId}/reject`);
};

export const useRejectOrder = () => {
  const queryClient = useQueryClient();
  const {
    mutate: rejectOrder,
    mutateAsync: rejectOrderAsync,
    ...rest
  } = useMutation({
    mutationFn: rejectOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return { rejectOrder, rejectOrderAsync, ...rest };
};
