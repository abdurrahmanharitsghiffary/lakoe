import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { TbListSearch } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";

type TabType =
  | "all"
  | "notPaid"
  | "newOrder"
  | "ready"
  | "delivery"
  | "done"
  | "cancelled";
type StatusCount = {
  semua: number;
  belumDibayar: number;
  pesananBaru: number;
  siapDikirim: number;
  dalamPengiriman: number;
  pesananSelesai: number;
  dibatalkan: number;
};

const orderStatusCount: StatusCount = {
  semua: 10,
  belumDibayar: 0,
  pesananBaru: 1,
  siapDikirim: 1,
  dalamPengiriman: 1,
  pesananSelesai: 1,
  dibatalkan: 6,
};

export function OrderTabs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const t = (searchParams.get("t") || "all") as TabType;
  const handleValueChange = (type: string) => {
    navigate({ search: "?t=" + type });
  };
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <p className="text-lg font-medium m-3">Daftar Pesanan</p>
      <Tabs
        defaultValue="all"
        onValueChange={handleValueChange}
        value={t}
        className="w-full relative"
      >
        <div
          className="overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 min-w-max">
            <TabsTrigger
              value="all"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.semua > 0 && (
                <Badge variant={"lakoePrimary"}>{orderStatusCount.semua}</Badge>
              )}
              Semua
            </TabsTrigger>

            <TabsTrigger
              value="notPaid"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.belumDibayar > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.belumDibayar}
                </Badge>
              )}
              Belum DiBayar
            </TabsTrigger>

            <TabsTrigger
              value="newOrder"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.pesananBaru > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.pesananBaru}
                </Badge>
              )}
              Pesanan Baru
            </TabsTrigger>

            <TabsTrigger
              value="ready"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.pesananBaru > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.siapDikirim}
                </Badge>
              )}
              Siap Dikirim
            </TabsTrigger>

            <TabsTrigger
              value="delivery"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.dalamPengiriman > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.dalamPengiriman}
                </Badge>
              )}
              Dalam Pengiriman
            </TabsTrigger>

            <TabsTrigger
              value="done"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.pesananSelesai > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.pesananSelesai}
                </Badge>
              )}
              Pesanan Selesai
            </TabsTrigger>

            <TabsTrigger
              value="cancelled"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none"
            >
              {orderStatusCount.dibatalkan > 0 && (
                <Badge variant={"lakoePrimary"}>
                  {orderStatusCount.dibatalkan}
                </Badge>
              )}
              Dibatalkan
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="w-full flex justify-between m-2 gap-1">
        <div>
          <Input
            placeholder="Cari Pesanan"
            type="text"
            className="flex-1"
            startAdornment={<TbListSearch className="text-base" />}
          />
        </div>

        <div className="w-full">
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Kurir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JNE">JNE</SelectItem>
              <SelectItem value="JNT">JNT</SelectItem>
              <SelectItem value="Sicepat">Sicepat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full ">
          <Select>
            <SelectTrigger className="flex-1">
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
    </div>
  );
}
