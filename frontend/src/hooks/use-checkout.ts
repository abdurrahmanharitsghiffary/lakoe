import { SKU } from "@/types/single-product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SKUDetail = { sku: SKU; qty: number; name: string };

type State = {
  skus: SKUDetail[];
};

type Actions = {
  setSkus: (skus: SKUDetail[]) => void;
};

export const useCheckoutStore = create(
  persist<State & Actions>(
    (set) => ({
      skus: [],
      setSkus: (skus) => set({ skus }),
    }),
    {
      name: "checkout-skus",
    }
  )
);

export const useGetSkus = () => useCheckoutStore((state) => state.skus);
export const useSetSkus = () => useCheckoutStore((state) => state.setSkus);
