import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../products/validator/use-add-product";
import { z } from "zod";

export const useAddProduct = () => {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      category: [""],
      attachments: "",
      price: 0,
      stock: 0,
      weightInGram: 0,
      minimumOrder: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};
