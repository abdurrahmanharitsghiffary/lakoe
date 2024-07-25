import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TbListSearch } from "react-icons/tb";
import { TabItem } from "../tabs";
import { OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";
import { inputVariantProps } from "@/features/products/components/input/input-form";

const orderStatusCount: Record<OrderStatus | "ALL", number> = {
  ALL: 0,
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
    label: "Pesanan Selesai",
    value: "SUCCESS",
    leftBadge: orderStatusCount.SUCCESS.toString(),
  },
  {
    label: "Dibatalkan",
    value: "CANCELLED",
    leftBadge: orderStatusCount.CANCELLED.toString(),
  },
];

interface OrderTabsProps {
  onTabChange: (value: OrderStatus | "ALL") => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function OrderTabs({ onTabChange, searchQuery, setSearchQuery }: OrderTabsProps) {
  const handleTabChange = (value: OrderStatus | "ALL") => {
    onTabChange(value);
  };

  return (
    <div className="flex items-center mb-4">
      <Select onValueChange={handleTabChange} defaultValue="ALL">
        <SelectTrigger className="w-48 bg-white border border-gray-300 rounded-md shadow-sm">
          <SelectValue placeholder="Pilih Status Pesanan" />
        </SelectTrigger>
        <SelectContent>
          {tabItems.map((tabItem) => (
            <SelectItem key={tabItem.value} value={tabItem.value}>
              {tabItem.label} ({tabItem.leftBadge})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="ml-4 flex items-center">
        <Input
          placeholder="Cari pesanan"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("w-64 border border-gray-300 rounded-md")}
        />
        <TbListSearch className="ml-2 text-gray-500" />
      </div>
    </div>
  );
}
