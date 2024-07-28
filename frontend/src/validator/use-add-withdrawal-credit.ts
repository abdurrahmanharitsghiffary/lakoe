import { z } from "zod";

export const WithdrawalCreditSchema = z.object({
  balance: z.number().min(1, "Saldo tidak boleh 0"),
  bank: z.string().min(1, "bank tidak boleh kosong"),
  password: z.string().min(1, "Password Harus Diisi"),
});
