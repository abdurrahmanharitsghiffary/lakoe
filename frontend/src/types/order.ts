type Attribute = {
  name: string;
};

type SKUAttribute = {
  value: string;
  attribute: Attribute;
};

type Product = {
  name: string;
  isActive: boolean;
  id: number;
};

type SKU = {
  sku: string;
  product: Product;
  discount: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  discountType: string;
  isActive: boolean;
  image: string | null;
  price: string;
  stock: number;
  weightInGram: number;
  skuAttributes: SKUAttribute[];
};

type OrderDetail = {
  sku: SKU;
  qty: number;
  pricePerProduct: string;
  weightPerProductInGram: number;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: string;
  receiverAddress: string;
  receiverAddressPhone: string;
  receiverCity: string;
  receiverContactName: string;
  receiverContactPhone: string;
  receiverDistrict: string;
  receiverLatitude: string;
  receiverLongitude: string;
  receiverName: string;
  receiverPostalCode: string;
  receiverProvince: string;
  serviceCharge: string;
  updatedAt: Date;
  createdAt: Date;
};

type Courier = {
  id: number;
  biteshipOrderId: string;
  biteshipTrackingId: string;
  biteshipWaybillId: string;
  price: string;
  courierCode: string;
  courierServiceCode: string;
};

export type OrderStatus =
  | "NOT_PAID"
  | "NEW_ORDER"
  | "READY_TO_DELIVER"
  | "ON_DELIVERY"
  | "SUCCESS"
  | "CANCELLED";

export type Order = {
  createdAt: Date;
  description: string;
  id: string;
  status: OrderStatus;
  updatedAt: Date;
  invoice: Invoice;
  courier: Courier;
  orderDetails: OrderDetail[];
  _count: {
    orderDetails: number;
  };
};
