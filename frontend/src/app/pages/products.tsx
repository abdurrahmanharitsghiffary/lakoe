import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardProduct } from "@/features/products/card-product";
import { SelectValue } from "@radix-ui/react-select";
import { CiCirclePlus } from "react-icons/ci";

const dummyProducts = Array.from({ length: 10 }, (_, i) => ({
  price: Math.floor(Math.random() * 50000) + 10000, // random price between 10000 and 60000
  sku: `SKU${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // random SKU
  src: `https://source.unsplash.com/random/200x200?sig=${i}`, // different image for each product
  stock: Math.floor(Math.random() * 100) + 1, // random stock between 1 and 100
  title: `Product ${i + 1}`, // unique title
  key: i,
}));

export function ProductsPage() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full max-w-md m-10">
          <div className="flex justify-between">
            <h1 className="text-xl m-4 font-bold">Daftar Produk</h1>
            <Button className="m-4 bg-btn-primary rounded-full">
              <CiCirclePlus size={25} />
              <span className="ml-2">Tambah Produk</span>
            </Button>
          </div>
          <Tabs defaultValue="semua" className="w-[400px] m-3  ">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="semua"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="aktif"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Aktif
              </TabsTrigger>
              <TabsTrigger
                value="nonaktif"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Nonaktif
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex justify-between">
            <Input
              placeholder="Cari produk"
              className="m-3 p-2 "
              style={{ flex: 2 }}
            />
            <Select>
              <SelectTrigger className="m-3" style={{ flex: 1 }}>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pakaian">Pakaian</SelectItem>
                <SelectItem value="celana">Celana</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="m-3 " style={{ flex: 1 }}>
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Hari</SelectItem>
                <SelectItem value="month">Bulan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardContent className="flex flex-col gap-3 px-3">
            {dummyProducts.map((product) => (
              <CardProduct
                price={product.price}
                sku={product.sku}
                src="https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                stock={product.stock}
                title={product.title}
                key={product.key}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
