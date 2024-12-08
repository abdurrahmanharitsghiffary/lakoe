import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const acceptOrderApi = (orderId: string) => {
  return axios.post(`/orders/${orderId}/accept`);
};

export const useAcceptOrder = () => {
  const queryClient = useQueryClient();
  const {
    mutate: acceptOrder,
    mutateAsync: acceptOrderAsync,
    ...rest
  } = useMutation({
    mutationFn: acceptOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return { acceptOrder, acceptOrderAsync, ...rest };
};
