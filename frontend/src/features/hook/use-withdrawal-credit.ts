import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WithdrawalCreditSchema } from "../validator/use-add- withdrawal-credit";

export const useWithdrawalCredit = () => {
  const form = useForm<z.infer<typeof WithdrawalCreditSchema>>({
    resolver: zodResolver(WithdrawalCreditSchema),
    defaultValues: {
        balance:0,
        bank:"",
        password:"",
    },
  });

  const onSubmit = (values: z.infer<typeof WithdrawalCreditSchema>) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};
