export type Attribute = {
  name: string;
  skuAttributes: SkuAttribute[];
};

export type SkuAttribute = {
  value: string;
  attribute: Attribute;
};

export type SKU = {
  sku: string;
  discount: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  discountType: "FIXED" | "PERCENTAGE";
  isActive: boolean;
  image: string;
  price: string;
  stock: number;
  weightInGram: number;
  skuAttributes: SkuAttribute[];
};

type Category = {
  name: string;
};

type Store = {
  bannerAttachment: string;
  createdAt: Date;
  description: string;
  domain: string;
  id: number;
  logoAttachment: string;
  name: string;
  slogan: string;
  updatedAt: Date;
};

export type SingleProduct = {
  store: Store;
  id: number;
  images: string[];
  categories: Category[];
  description: string;
  isActive: boolean;
  minimumOrder: number;
  name: string;
  attributtes: Attribute[];
  _count: {
    skus: number;
  };
  skus: SKU[];
};
