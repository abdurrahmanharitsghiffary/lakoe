import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Attribute {
  name: string;
}

interface SkuAttribute {
  value: string;
  attribute: Attribute;
}

interface Sku {
  sku: string;
  discount: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  discountType: string;
  isActive: boolean;
  image: string;
  price: string;
  stock: number;
  weightInGram: number;
  skuAttributes: SkuAttribute[];
}

interface CartItem {
  qty: number;
  updatedAt: string;
  createdAt: string;
  sku: Sku;
}

interface Store {
  id: number;
  name: string;
  slogan: string;
  logoAttachment: string;
  bannerAttachment: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  domain: string;
  user: {
    id: number;
    profile: string | null;
  };

  _count: {
    products: number;
  };
}

interface CartState {
  id: string;
  cartItem: CartItem[];
  store: Store | null;
  setCartData: (data: {
    id: string;
    cartItem: CartItem[];
    store: Store;
  }) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      id: "",
      cartItem: [],
      store: null,
      setCartData: (data) => set({ ...data }),
      clearCartData: () => set({ id: "", cartItem: [], store: null }),
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    }
  )
);
