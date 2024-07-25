import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(2, "Nama produk tidak boleh kosong.").optional(),
  description: z
    .string()
    .min(1, "Deskripsi produk tidak boleh kosong.")
    .optional(),
  minimumOrder: z
    .number()
    .min(1, "Order minimum tidak boleh kosong.")
    .positive()
    .optional(),
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
