import { axios } from "@/lib/axios";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { StoreSchema, storeSchema } from "@/validator/store-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useStore = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: { description: "", name: "", slogan: "" },
  });
  console.log(watch("logo"), "LOGO");
  console.log("watch:", watch("banner"));

  const onSubmit: SubmitHandler<StoreSchema> = async (data) => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("slogan", data.slogan);
    // if (data.logo) {
    //   formData.append("logo", data.logo[0]);
    // }
    // if (data.banner) {
    //   formData.append("banner", data.banner[0]);
    // }

    // console.log("logo:", data?.logo?.[0]);
    // console.log("banner:", data?.banner?.[0]);
    toast.promise(
      axios
        .post("/stores", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
      {
        error: {
          render({ data }) {
            return getAxiosErrMessage(data);
          },
        },
        success: {
          render() {
            navigate("/seller/dashboard", { replace: true });
            return "Store successfuly created.";
          },
        },
        pending: "Creating store...",
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    ...rest,
  };
};
