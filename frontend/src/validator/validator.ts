import { z, ZodType } from "zod";
import { ChangePriceType, ChangeStokType } from "@/types/type";

export const changePriceSchema: ZodType<ChangePriceType> = z.object({
  price: z
    .number()
    .min(1, {
      message: "price not empty",
    })
    .max(255),
});
export const changeStokSchema: ZodType<ChangeStokType> = z.object({
  stok: z
    .number()
    .min(1, {
      message: "stock not empty",
    })
    .max(255),
});
