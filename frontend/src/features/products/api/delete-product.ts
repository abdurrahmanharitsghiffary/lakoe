import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteProductApi = (productId: number) => {
  return axios.delete(`/products/${productId}`);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProduct,
    mutateAsync: deleteProductAsync,
    ...rest
  } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { deleteProduct, deleteProductAsync, ...rest };
};
