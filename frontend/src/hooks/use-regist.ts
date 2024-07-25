import { axios } from "@/lib/axios";
import { toast } from "react-toastify";
import { Register } from "@/types/auth-type";
import { registerSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSessionActions } from "./use-session";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { ApiResponse } from "@/types/api-response";

export const useRegist = () => {
  const { login } = useSessionActions();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<Register> = async (data) => {
    toast.promise(axios.post<ApiResponse<any>>("/auth/register", data), {
      success: {
        render({ data }) {
          const token = data?.data?.data?.token;
          if (token) {
            login(token);
          }
          navigate("/auth/verify-account", { replace: true });
          return "Account successfully registered.";
        },
      },
      error: {
        render({ data }) {
          return getAxiosErrMessage(data);
        },
      },
      pending: "Registering your account...",
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
