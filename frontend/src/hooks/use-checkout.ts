import { SKU } from "@/types/single-product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SKUDetail = { sku: SKU; qty: number; name: string };

type State = {
  skus: SKUDetail[];
  storeId: number;
};

type Actions = {
  setSkus: (skus: SKUDetail[]) => void;
  setStoreId: (id: number) => void;
};

export const useCheckoutStore = create(
  persist<State & Actions>(
    (set) => ({
      storeId: -1,
      skus: [],
      setStoreId: (id: number) => set({ storeId: id }),
      setSkus: (skus) => set({ skus }),
    }),
    {
      name: "checkout-skus",
    }
  )
);

export const useGetSkus = () => useCheckoutStore((state) => state.skus);
export const useGetStoreId = () => useCheckoutStore((state) => state.storeId);
export const useSetSkus = () => useCheckoutStore((state) => state.setSkus);
export const useSetStoreId = () =>
  useCheckoutStore((state) => state.setStoreId);
