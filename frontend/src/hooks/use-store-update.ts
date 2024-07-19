import { axios } from "@/lib/axios";
import { StoreUpdate } from "@/types/store";
import { storeSchema } from "@/validator/store-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const useStoreUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreUpdate>({
    mode: "onChange",
    resolver: zodResolver(storeSchema),
  });

  const onSubmit: SubmitHandler<StoreUpdate> = async (data) => {
    try {
      const response = await axios.patch(`/me/stores`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("update: ", response.data);
      reset();
    } catch (error) {
      console.error("update error: ", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
