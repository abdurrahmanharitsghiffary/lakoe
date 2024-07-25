import { axios } from "@/lib/axios";
import { Login } from "@/types/auth-type";
import { loginSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSessionActions } from "./use-session";
import { toast } from "react-toastify";
import { ApiResponse } from "@/types/api-response";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useSessionActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    toast.promise(axios.post<ApiResponse<any>>("/auth/login", data), {
      success: {
        render({ data }) {
          const token = data?.data?.data?.token;
          if (token) {
            login(token);
          }
          navigate("/seller/dashboard", { replace: true });
          return "Login successful";
        },
      },
      error: {
        render({ data }) {
          return getAxiosErrMessage(data);
        },
      },
      pending: "Login to your account...",
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
