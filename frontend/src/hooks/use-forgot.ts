import { axios } from "@/lib/axios";
import { Forgot } from "@/types/auth-type";
import { forgotSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const useForgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Forgot>({
    mode: "onChange",
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit: SubmitHandler<Forgot> = async (data) => {
    try {
      const response = await axios.post("/auth/forgot-password", data);

      const user = response.data;
      console.log("forgot success:", user);
    } catch (error) {
      console.log("forgot error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
