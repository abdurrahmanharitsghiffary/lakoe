import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderList } from "@/components/order/order-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TbListSearch } from "react-icons/tb";

type StatusCount = {
    semua: number;
    belumDibayar: number;
    pesananBaru: number;
    siapDikirim: number;
    dalamPengiriman: number;
    pesananSelesai: number;
    dibatalkan: number;
}

const orderStatusCount: StatusCount = {
    semua: 10,
    belumDibayar: 0,
    pesananBaru: 1,
    siapDikirim: 1,
    dalamPengiriman: 1,
    pesananSelesai: 1,
    dibatalkan: 6,

}

export function OrderTabs() {
    return (
        <div className="w-full overflow-x-hidden bg-white">
            <p className="text-lg font-medium pl-3">Daftar Pesanan</p>
            <Tabs defaultValue="account" className="w-full">
                <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch'}}>
                <TabsList className="flex space-x-4 min-w-max">
                    <TabsTrigger value="account" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.semua > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.semua}</Badge>}
                        Semua
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.belumDibayar > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.belumDibayar}</Badge>}
                        Belum DiBayar
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.pesananBaru > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.pesananBaru}</Badge>}
                        Pesanan Baru
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.siapDikirim > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.siapDikirim}</Badge>}
                        Siap Dikirim
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.dalamPengiriman > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.dalamPengiriman}</Badge>}
                        Dalam Pengiriman
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.pesananSelesai > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.pesananSelesai}</Badge>}
                        Pesanan Selesai
                    </TabsTrigger>

                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                        {orderStatusCount.dibatalkan > 0 && <Badge className="bg-lakoe-primary mr-1">{orderStatusCount.dibatalkan}</Badge>}
                        Dibatalkan
                    </TabsTrigger>
                </TabsList>
                </div>
            </Tabs>

            <div className="w-full flex items-center border border-gray-300 border-opacity-50 p-4 rounded-md gap-1">
                <Input placeholder="Cari Pesanan" type="text" className="flex-1" startAdornment={<TbListSearch className="text-base"/>} />

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
    )
}

