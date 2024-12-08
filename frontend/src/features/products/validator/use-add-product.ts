import { z } from "zod";

export const createSkuAttributeSchema = z.object({
  value: z.string().min(1),
  attributeName: z.string().min(1),
});

export type CreateSkuAttributeSchema = z.infer<typeof createSkuAttributeSchema>;

export const createSkuSchema = z.object({
  stock: z.number().min(1, "Stok produk tidak boleh kosong").positive(),
  isActive: z.boolean().optional(),
  // discount: z.number().optional(),
  // discountType: z.enum(["FIXED", "PERCENTAGE"]).optional(),
  weightInGram: z.number().min(1, "Berat produk tidak boleh kosong").positive(),
  price: z.number().min(1, "Harga produk tidak boleh kosong").positive(),
  skuAttribute: z.array(createSkuAttributeSchema).optional(),
});

export type CreateSkuSchema = z.infer<typeof createSkuSchema>;

// export const createProductSchema = z.object({
//   description: z.string(),
//   minimumOrder: z.number().min(1,"Minimal order tidak boleh kosong").positive(),
//   categories: z.array(z.string()).optional(),
//   name: z.string().min(2),
//   isActive: z.boolean().optional(),
// });

// export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const addProductSchema = z
  .object({
    name: z.string().min(2, "Nama produk tidak boleh kosong"),
    description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
    categories: z
      .array(z.string())
      .min(1, "Kategori produk tidak boleh kosong"),
    minimumOrder: z.number().min(1, "Masukkan produk minimal"),
    images: z.array(z.any()).min(1, "Foto produk tidak boleh kosong"),
    skus: z.array(createSkuSchema).min(1),
  })
  .refine(
    (arg) => {
      console.log(arg.images, "ARGIM");
      return arg.images.some((image) => image instanceof File);
    },
    { message: "Foto produk tidak boleh kosong", path: ["images"] }
  );

export type AddProductSchema = z.infer<typeof addProductSchema>;
