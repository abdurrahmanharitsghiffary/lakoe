import { Variant } from "./variant";

export type Product = {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  attachments: string[];
  minimumOrder: number;
  categories: {
    name: string;
  }[];
  variants: Variant[];
};
