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

  console.log("watch:", watch("bannerAttachment"));

  const onSubmit: SubmitHandler<Store> = async (data) => {
    try {
      const response = await axios.post("/stores", data, {
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
