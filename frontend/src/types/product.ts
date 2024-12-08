type Category = {
  name: string;
};

type SkuAttribute = {
  value: string;
};

type Attribute = {
  name: string;
  skuAttributes: SkuAttribute[];
};

type Store = {
  name: string;
  id: number;
};

type Count = {
  skus: number;
};

export type Product = {
  id: number;
  images: string[];
  categories: Category[];
  description: string;
  isActive: boolean;
  minimumOrder: number;
  name: string;
  attributtes: Attribute[];
  _count: Count;
  store: Store;
};
