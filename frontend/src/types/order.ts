import { ProductVariant } from "@/features/products/components/card-product";
import { Courier } from "./courier";

export type Order = {
  id: number;
  status: OrderStatus;
  qty: number;
  pricePerProduct: number;
  discount: number;
  receiverAddress: string;
  receiverPostalCode: string;
  receiverCityDistrict: string;
  receiverProvince: string;
  receiverLatitude: string;
  receiverLongitude: string;

  updatedAt: Date;
  createdAt: Date;

  productVariant: ProductVariant;
  courier: Courier;
};

export type OrderStatus =
  | "NOT_PAID"
  | "NEW_ORDER"
  | "READY_TO_DELIVER"
  | "ON_DELIVERY"
  | "SUCCESS"
  | "CANCELLED";

export type AllOrder = {
  createdAt: string; // ISO date string
  description: string;
  id: string;
  status: OrderStatus;
  updatedAt: string; // ISO date string
  invoice: string | null;
  courier: string | null;
  _count: {
    orderDetails: number;
  };
  skus: any[];
};
