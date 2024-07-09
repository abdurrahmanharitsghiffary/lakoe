import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderList } from "@/components/order/order-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"



function ProductTabs() {
    return (
        <div className="w-full">
            <p className="text-lg font-medium bg-white pl-3">Daftar Pesanan</p>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Semua  
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Belum DiBayar
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Pesanan Baru  
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Siap Dikirim
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Dalam Pengiriman
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Pesanan Selesai      
                    </TabsTrigger>
                    <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">
                    <Badge variant="secondary">5</Badge>
                    Dibatalkan 
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div color="gray" className="w-full flex items-center max-w-sm border border-gray-300 border-opacity-50 p-4 rounded-md gap-1">
                <Input placeholder="Cari Pesanan" type="text" className="flex-1" />

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
export default ProductTabs
