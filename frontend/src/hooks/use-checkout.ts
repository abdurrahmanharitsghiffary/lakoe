import { create } from "zustand";

type SKU = { id: number; qty: number };

type State = {
  skus: SKU[];
};

type Actions = {
  setSkus: (skus: SKU[]) => void;
};

export const useCheckoutStore = create<State & { actions: Actions }>((set) => ({
  actions: { setSkus: (skus) => set((state) => ({ ...state, skus })) },
  skus: [],
}));

export const useGetSkus = () => useCheckoutStore((state) => state.skus);
export const useCheckoutActions = () =>
  useCheckoutStore((state) => state.actions);
