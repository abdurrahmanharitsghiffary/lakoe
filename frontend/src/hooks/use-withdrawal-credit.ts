import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { withdrawalCreditSchema } from "../validator/withdrawal-credit";

export const useWithdrawalCredit = () => {
  const form = useForm<z.infer<typeof withdrawalCreditSchema>>({
    resolver: zodResolver(withdrawalCreditSchema),
    defaultValues: {
      balance: 0,
      bank: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof withdrawalCreditSchema>) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};
