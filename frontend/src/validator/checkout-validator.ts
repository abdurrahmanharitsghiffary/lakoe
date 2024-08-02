import { z } from "zod";

export const addCheckoutSchema = z.object({
  courierCode: z.string(),
  courierServiceCode: z.string(),
  receiverContactName: z
    .string()
    .min(1, { message: "Recipient name is required" }),
  receiverContactPhone: z.string(),
  orderNote: z.string().min(1, { message: "note are required" }),
  receiverDistrict: z.string().min(1, { message: "Sub-district is required" }),
  receiverCity: z.string().min(1, { message: "cities is required" }),
  receiverProvince: z.string().min(1, { message: "province is required" }),
  receiverAddress: z.string().min(1, { message: "Pinpoint not added" }),
  receiverPostalCode: z.string().min(1, { message: "Postal code is required" }),
  addressDetails: z
    .string()
    .min(1, { message: "Address details are required" }),
  receiverLatitude: z.string(),
  receiverLongitude: z.string(),
  // methodDelivery: z.string().min(1, { message: "Delivery are required" }),
});

export type FormCheckout = z.infer<typeof addCheckoutSchema>;
