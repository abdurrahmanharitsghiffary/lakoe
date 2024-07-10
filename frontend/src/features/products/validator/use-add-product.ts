import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(2, "Nama produk tidak boleh kosong"),
  url: z.string().min(1, "URL produk tidak boleh kosong"),
  description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
  category: z.array(z.string()).min(1, "Kategori produk tidak boleh kosong"),
  minimumOrder: z.number().min(1, "Masukkan produk minimal"),
  price: z.number().min(1, "Harga produk tidak boleh kosong"),
  attachments: z.string().min(1, "Foto produk tidak boleh kosong"),
  weightInGram: z.number().min(1, "Masukkan berat produk"),
  stock: z.number().min(1, "Stock tidak boleh kosong").positive(),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
