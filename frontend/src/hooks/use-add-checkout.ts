import { checkout } from "@/types/checkout";
import { addCheckoutSchema } from "../validator/use-add-checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const useAddCheckout= () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<checkout>({
    mode: "onChange",
    resolver: zodResolver(addCheckoutSchema),
  });

  const onSubmit: SubmitHandler<checkout> = (data) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};