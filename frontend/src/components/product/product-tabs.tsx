import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductList } from "@/components/product/product-list"

function ProductTabs() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account" className="px-4 py-2 bg-white rouded-lg shadow-md">Semua</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Belum DiBayar</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Pesanan Baru</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Siap Dikirim</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Dalam Pengiriman</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Pesanan Selesai</TabsTrigger>
                <TabsTrigger value="password" className="px-4 py-2 bg-white rouded-lg shadow-md">Dibatalkan</TabsTrigger>
            </TabsList>
            <ProductList/>
        </Tabs>
    )
}
export default ProductTabs