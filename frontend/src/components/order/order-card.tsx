import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "../image";
import { OrderTabs } from "./order-tabs";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-session";
import { ApiResponse } from "@/types/api-response";
import { useState } from "react";
import { Link } from "react-router-dom";

export const status = {
  NOT_PAID: {
    label: "Belum Dibayar",
    cn: "#e8c600",
    buttonLabel: "Hubungi Pembeli",
  },
  NEW_ORDER: {
    label: "Pesanan Baru",
    cn: "#008f5d",
    buttonLabel: "Proses Pesanan",
  },
  READY_TO_DELIVER: {
    label: "Siap Dikirim",
    cn: "#147af3",
    buttonLabel: "Kabari Pembeli",
  },
  ON_DELIVERY: {
    label: "Dalam Pengiriman",
    cn: "#f68511",
    buttonLabel: "Lihat Rincian Pengiriman",
  },
  SUCCESS: {
    label: "Pesanan Selesai",
    cn: "#ffffff",
    buttonLabel: "Hubungi Pembeli",
  },
  CANCELLED: {
    label: "Dibatalkan",
    cn: "#ea3829",
    buttonLabel: "",
  },
};

interface SkuAttribute {
  attributeKey: string;
  attributeValue: string;
}

interface Product {
  name: string;
  isActive: boolean;
}

interface Sku {
  createdAt: string;
  discount: string;
  discountType: string;
  id: number;
  image: string;
  isActive: boolean;
  price: string;
  product: Product;
  sku: string;
  skuAttributes: SkuAttribute[];
  stock: number;
  updatedAt: string;
  weightInGram: number;
  weightPerProductInGram: number;
  pricePerProduct: string;
  qty: number;
}

interface Invoice {
  amount: string;
  id: string;
  invoiceNumber: string;
}

interface Order {
  courier: string | null;
  createdAt: string;
  description: string;
  id: string;
  invoice: Invoice | null;
  skus: { sku: Sku; qty: number; pricePerProduct: string; weightPerProductInGram: number }[];
  status: keyof typeof status;
  updatedAt: string;
  _count: {
    orderDetails: number;
  };
}

const fetchOrder = async ({ searchQuery, storeId, status }: { storeId: number; searchQuery?: string; status: keyof typeof status | "ALL" }) => {
  const response = await axios.get(`/stores/${storeId}/orders`, {
    params: { q: searchQuery, status: status === "ALL" ? undefined : status },
  });
  console.log("watch:", response.data);
  return response.data;
};

export function Order() {
  const { user } = useSession();
  const storeId = user?.storeId;
  const [selectedStatus, setSelectedStatus] = useState<keyof typeof status | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!storeId) return <div>No storeId available</div>;

  const { data, isLoading, error } = useQuery<ApiResponse<Order[]>, Error>({
    queryKey: ["stores", storeId, "orders", searchQuery, selectedStatus],
    queryFn: () => fetchOrder({ storeId: storeId as number, searchQuery, status: selectedStatus }),
    enabled: !!storeId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch orders</div>;

  if (!data || !Array.isArray(data.data)) {
    return <div>No orders available</div>;
  }

  // Filter orders based on selected status and search query
  const filteredOrders = data.data
    .filter(order => selectedStatus === "ALL" || order.status === selectedStatus)
    .filter(order =>
      order.invoice?.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.skus.some(sku => sku.sku.product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Filter orders to include only those with SKUs
  const ordersWithSkus = filteredOrders.filter(order => order.skus.length > 0);

  return (
    <div>
      <OrderTabs onTabChange={setSelectedStatus} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {ordersWithSkus.map((order) => {
        const statusInfo = status[order.status];
        if (!statusInfo) {
          console.error(`Invalid status: ${order.status}`);
          return null;
        }
        const { label, cn, buttonLabel } = statusInfo;

        const totalItems = order.skus.reduce((total, sku) => total + sku.qty, 0);
        const totalPrice = order.skus
          .reduce((total, sku) => total + parseFloat(sku.pricePerProduct) * sku.qty, 0)
          .toFixed(2);

        const imageUrl = order.skus[0].sku.image;
        const productName = order.skus[0].sku.product.name;

        return (
          <Link to={`/seller/orders/${order.id}`} key={order.id}>
            <Card className="overflow-hidden flex justify-center min-h-[150px]">
              <div className="w-full">
                <CardHeader className="items-left bg-gray-50 p-3">
                  <div className="flex justify-between">
                    <div className="flex-shrink-0">
                      <p
                        className="px-3 w-fit text-white rounded-sm h-7 flex justify-center pb-7 mt-1 text-base"
                        style={{ backgroundColor: cn }}
                      >
                        {label}
                      </p>
                      <p className="text-gray-500 mt-2 text-sm pb-1">
                        {order.invoice ? order.invoice.invoiceNumber : "No Invoice Number"}
                      </p>
                    </div>
                    {buttonLabel && (
                      <Button
                        className="py-2 px-4 text-black bg-white rounded-full border border-gray-300 mb-5 hover:bg-gray-200 hover:border-gray-400 hover:text-black"
                        onClick={() => {
                          /* Your submit logic here */
                        }}
                      >
                        {buttonLabel}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="!p-4 flex justify-end border-t border-grey-300 pt-1">
                  <div className="flex items-center mr-auto">
                    <Image
                      src={imageUrl}
                      alt={productName}
                      className="aspect-square h-[50px] w-[50px] object-center object-cover"
                    />
                    <div className="ml-4">
                      <CardTitle className="text-base font-bold text-gray-900">
                        {productName}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {totalItems} Barang
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <p className="text-base text-gray-500">Total belanja</p>
                    <p className="text-base font-semibold text-gray-900">
                      Rp{order.invoice?.amount || "0"}
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
