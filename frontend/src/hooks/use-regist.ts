import { Register } from "@/types/auth-type";
import { registerSchema } from "@/validator/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const userRegist = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });
};
