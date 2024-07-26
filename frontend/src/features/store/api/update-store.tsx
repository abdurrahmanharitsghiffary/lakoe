import { UpdateStoreSchema } from "@/validator/store-validator";
import { axios } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getMeOptions } from "@/features/me/api/me-api";

export const updateStore = (data: UpdateStoreSchema) => {
  return axios.patch<ApiResponse<any>>("/me/stores", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeOptions().queryKey });
    },
  });
};
