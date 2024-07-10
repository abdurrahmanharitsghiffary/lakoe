import { AddProductSchema } from "@/features/products/validator/use-add-product";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const createProduct = (data: AddProductSchema) => {
  return axios.post("/products", data);
};

export const useCreateProucts = () => {
  const queryClient = use;
  const {} = useMutation({ mutationFn: createProduct, onSuccess: () => {} });
};
