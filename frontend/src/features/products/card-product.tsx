import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectValue } from "@radix-ui/react-select";

import { CiCirclePlus } from "react-icons/ci";

export function CardProduct() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-2/5 m-10">
          <div className="flex justify-between">
            <h1 className="text-xl m-4 font-bold">Daftar Produk</h1>
            <Button className="m-4 bg-btn-primary rounded-full">
              <CiCirclePlus size={25} /> Tambah Produk
            </Button>
          </div>
          <Tabs defaultValue="semua" className="w-[400px] m-3  ">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="semua"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="aktif"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
              >
                Aktif
              </TabsTrigger>
              <TabsTrigger
                value="nonaktif"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
              >
                Nonaktif
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex justify-between">
            <Input placeholder="Cari produk" className="w-44 m-3 p-2 " />
            <Select>
              <SelectTrigger className="w-44 m-3">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pakaian">Pakaian</SelectItem>
                <SelectItem value="celana">Celana</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-44 m-3 ">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Hari</SelectItem>
                <SelectItem value="month">Bulan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </>
  );
}
