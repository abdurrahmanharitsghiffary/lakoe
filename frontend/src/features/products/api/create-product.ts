import { AddProductSchema } from "@/features/products/validator/use-add-product";
import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createProductApi = (data: AddProductSchema) => {
  return axios.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useCreateProducts = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createProduct,
    mutateAsync: createProductAsync,
    ...rest
  } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { createProduct, createProductAsync, ...rest };
};
