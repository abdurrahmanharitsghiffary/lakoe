import { z } from "zod";

export const addCheckoutSchema = z.object({
  recipientName: z.string().min(1,{ message: "Recipient name is required" }),
  telephone: z.string().min(1,{ message: "Telephone number is required" }).regex(/^[0-9]+$/, "Invalid telephone number"),
  subDistrict: z.string().min(1,{ message: "Sub-district is required" }),
  ward: z.string().min(1,{ message: "Ward is required" }),
  addressDetails: z.string().min(1,{ message: "Address details are required" }),
  address: z.string().min(1,{message:"Pinpoint not added"}),
  note: z.string().min(1,{message:"note are required"}),
  methodDelivery: z.string().min(1,{message:"Delivery are required"}),
});
