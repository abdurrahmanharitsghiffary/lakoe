type Product = {
  name: string;
  isActive: boolean;
  id: number;
};

type Attribute = {
  name: string;
};

type SkuAttribute = {
  value: string;
  attribute: Attribute;
};

export type SKU = {
  sku: string;
  product: Product;
  discount: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  discountType: string;
  isActive: boolean;
  image: string | null;
  price: string;
  stock: number;
  weightInGram: number;
  skuAttributes: SkuAttribute[];
};
