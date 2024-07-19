import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/lib/axios";
import { Register } from "@/types/auth-type";
import { registerSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSessionActions } from "./use-session";

export const useRegist = () => {
  const { toast } = useToast();
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
    try {
      const response = await axios.post("/auth/register", data);
      console.log("register succes:", response);

      const token = response.data.data.token;
      const user = response.data.user;

      if (token) {
        login(token);
      }

      if (user) {
        toast({
          title: "Register Success",
          duration: 3000,
          variant: "default",
        });
      }
      navigate("/auth/verify-account");
    } catch (error) {
      console.log("register error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
