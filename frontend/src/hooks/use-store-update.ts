import {
  UpdateStoreSchema,
  updateStoreSchema,
} from "@/validator/store-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetMyStore } from "@/features/store/api/get-my-store";
import { useUpdateStore } from "@/features/store/api/update-store";
import { toast } from "react-toastify";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";

export const useStoreUpdate = () => {
  const { data } = useGetMyStore();
  const { mutateAsync } = useUpdateStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<UpdateStoreSchema>({
    mode: "onChange",
    resolver: zodResolver(updateStoreSchema),
    values: {
      banner: data?.data?.bannerAttachment,
      description: data?.data?.description,
      logo: data?.data?.logoAttachment,
      name: data?.data?.name,
      slogan: data?.data?.slogan,
    },
  });

  const onSubmit: SubmitHandler<UpdateStoreSchema> = async (data) => {
    console.log(data, "DATA");
    if (!(data.banner instanceof File)) delete data.banner;
    if (!(data.logo instanceof File)) delete data.logo;
    toast.promise(mutateAsync(data), {
      error: {
        render({ data }) {
          return getAxiosErrMessage(data);
        },
      },
      success: {
        render(props) {
          reset();
          return "Update success";
        },
      },
      pending: "Updating store...",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    watch,
  };
};
