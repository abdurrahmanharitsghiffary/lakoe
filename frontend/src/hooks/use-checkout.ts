import { SKU } from "@/types/single-product";
import { create } from "zustand";

type SKUDetail = { sku: SKU; qty: number; name: string };

type State = {
  skus: SKUDetail[];
  actions: Actions;
};

type Actions = {
  setSkus: (skus: SKUDetail[]) => void;
};

export const useCheckoutStore = create<State & { actions: Actions }>((set) => ({
  skus: [],
  actions: {
    setSkus: (skus) => set((state) => ({ ...state, skus })),
  },
}));

export const useGetSkus = () => useCheckoutStore((state) => state.skus);
export const useCheckoutActions = () =>
  useCheckoutStore((state) => state.actions);
