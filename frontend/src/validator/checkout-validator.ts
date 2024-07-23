import { z } from "zod";

export const addCheckoutSchema = z.object({
  recipientName: z.string().min(1, { message: "Recipient name is required" }),
  telephone: z
    .string()
    .regex(/^\d+$/, "Telephone must contain only numbers")
    .min(1, "Telephone is required"),
  subDistrict: z.string().min(1, { message: "Sub-district is required" }),
  ward: z.string().min(1, { message: "Ward is required" }),
  cities: z.string().min(1, { message: "cities is required" }),
  province: z.string().min(1, { message: "province is required" }),
  addressDetails: z
    .string()
    .min(1, { message: "Address details are required" }),
  address: z.string().min(1, { message: "Pinpoint not added" }),
  note: z.string().min(1, { message: "note are required" }),
  methodDelivery: z.string().min(1, { message: "Delivery are required" }),
});

export type FormCheckout = z.infer<typeof addCheckoutSchema>;
