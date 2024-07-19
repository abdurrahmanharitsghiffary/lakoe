import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TbListSearch } from "react-icons/tb";
import { TabItem, Tabs } from "../tabs";
import { OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";
import { inputVariantProps } from "@/features/products/components/input/input-form";

const orderStatusCount: Record<OrderStatus | "ALL", number> = {
  ALL: 10,
  NOT_PAID: 0,
  NEW_ORDER: 1,
  READY_TO_DELIVER: 1,
  ON_DELIVERY: 1,
  SUCCESS: 1,
  CANCELLED: 6,
};

const tabItems: TabItem[] = [
  { label: "Semua", value: "ALL", leftBadge: orderStatusCount.ALL.toString() },
  {
    label: "Belum Dibayar",
    value: "NOT_PAID",
    leftBadge: orderStatusCount.NOT_PAID.toString(),
  },
  {
    label: "Pesanan Baru",
    value: "NEW_ORDER",
    leftBadge: orderStatusCount.NEW_ORDER.toString(),
  },
  {
    label: "Siap Dikirim",
    value: "READY_TO_DELIVER",
    leftBadge: orderStatusCount.READY_TO_DELIVER.toString(),
  },
  {
    label: "Dalam Pengiriman",
    value: "ON_DELIVERY",
    leftBadge: orderStatusCount.ON_DELIVERY.toString(),
  },
  {
    label: "Dibatalkan",
    value: "CANCELLED",
    leftBadge: orderStatusCount.CANCELLED.toString(),
  },
];

// Asumsikan `orders` adalah array yang diimpor dari sumber data
const orders = [
  { id: 1, name: "Order 1", price: 5000 },
  { id: 2, name: "Order 2", price: 3000 },
  { id: 3, name: "Order 3", price: 7000 },
];

export function OrderTabs() {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold m-4">Daftar Pesanan</h1>
      <div className="w-full overflow-x-hidden">
        <Tabs key="orderTabs" items={tabItems} defaultValue="ALL" />
      </div>
      <div className="w-full flex justify-between p-2 gap-2">
        <Input
          placeholder="Cari Pesanan"
          type="text"
          style={{ flex: 1 }}
          className={cn("flex-1", inputVariantProps({ focus: "lakoePrimary" }))}
          icon={<TbListSearch className="text-base" />}
        />

        <Select>
          <SelectTrigger style={{ flex: 1 }}>
            <SelectValue placeholder="Kurir" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JNE">JNE</SelectItem>
            <SelectItem value="JNT">JNT</SelectItem>
            <SelectItem value="Sicepat">Sicepat</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger style={{ flex: 1 }}>
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Terbaru">Terbaru</SelectItem>
            <SelectItem value="Harga Terendah">Harga Terendah</SelectItem>
            <SelectItem value="Harga Tertinggi">Harga Tertinggi</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
