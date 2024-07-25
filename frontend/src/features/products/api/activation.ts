import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const activationApi = ({
  ids,
  type,
  isActive,
}: {
  type: "sku" | "product";
  ids: number[];
  isActive: boolean;
}) => {
  return axios.post(`/activation`, { ids, isActive }, { params: { type } });
};

export const useActivation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: activation,
    mutateAsync: activationAsync,
    ...rest
  } = useMutation({
    mutationFn: activationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { activation, activationAsync, ...rest };
};
