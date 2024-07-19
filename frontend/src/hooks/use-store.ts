import { axios } from "@/lib/axios";
import { Store } from "@/types/store";
import { storeSchema } from "@/validator/store-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useStore = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Store>({
    mode: "onChange",
    resolver: zodResolver(storeSchema),
  });

  console.log("watch:", watch("banner"));

  const onSubmit: SubmitHandler<Store> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("slogan", data.slogan);
      if (data.logo) {
        formData.append("logo", data.logo[0]);
      }
      if (data.banner) {
        formData.append("banner", data.banner[0]);
      }

      console.log("logo:", data?.logo?.[0]);
      console.log("banner:", data?.banner?.[0]);
      const response = await axios.post("/stores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("store:", response.data);
      navigate("/seller/dashboard");
      return response.data;
    } catch (error) {
      console.log("store error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
