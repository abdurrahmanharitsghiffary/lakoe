import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createSkuSchema = z.object({
  id: z.number().min(1).positive(),
  stock: z
    .number()
    .min(1, "Stok tidak boleh kosong atau minus.")
    .positive()
    .optional(),
  isActive: z.boolean().optional(),
  weightInGram: z
    .number()
    .min(1, "Berat tidak boleh kosong atau minus.")
    .positive()
    .optional(),
  price: z
    .number()
    .min(1, "Harga tidak boleh kosong atau minus.")
    .positive()
    .optional(),
});

export const updateSkuSchema = createSkuSchema.partial();

export type UpdateSkuSchema = z.infer<typeof updateSkuSchema>;

type UpdateSkuOption = {
  skuId: number;
} & UpdateSkuSchema;

export const updateSkuApi = ({ skuId, ...options }: UpdateSkuOption) => {
  return axios.patch(`/skus/${skuId}`, options);
};

export const useUpdateSku = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateSku,
    mutateAsync: updateSkuAsync,
    ...rest
  } = useMutation({
    mutationFn: updateSkuApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { updateSku, updateSkuAsync, ...rest };
};
