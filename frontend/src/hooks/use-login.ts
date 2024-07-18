import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/lib/axios";
import { Login } from "@/types/auth-type";
import { loginSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      console.log("login success:", response);

      const token = response.data.data.token;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        toast({
          title: "Login Success",
          duration: 3000,
          variant: "default",
        });
      }
      navigate("/seller/dashboard");
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
