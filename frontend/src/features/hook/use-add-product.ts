import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../validator/use-add-product";
import { z } from "zod";

export const useAddProduct = () => {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      category: "",
      attachments: "",
      price: "",
      stock: "",
      weight: "",
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
