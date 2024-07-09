import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, "Nama produk tidak boleh kosong"),
  url: z.string().min(1, "URL produk tidak boleh kosong"),
  description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
  category: z.string().min(1, "Kategori produk tidak boleh kosong"),
  stock: z.string().min(1, "Masukkan produk minimal"),
  price: z.string().min(1, "Harga produk tidak boleh kosong"),
  attachments: z.string().min(1, "Foto produk tidak boleh kosong"),
  weight: z.string().min(1, "Masukkan berat produk"),
});
