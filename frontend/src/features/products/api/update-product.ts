import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  minimumOrder: z.number().min(1).positive().optional(),
  categories: z.array(z.string()).optional(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

type UpdateProductOption = {
  productId: number;
} & UpdateProductSchema;

export const updateProductApi = ({
  productId,
  ...options
}: UpdateProductOption) => {
  return axios.patch(`/products/${productId}`, options);
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateProduct,
    mutateAsync: updateProductAsync,
    ...rest
  } = useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { updateProduct, updateProductAsync, ...rest };
};
