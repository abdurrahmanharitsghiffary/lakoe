import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IoMdCube } from "react-icons/io";
import { RiSearchFill } from "react-icons/ri";

export function ProductNotFoundFallback() {
  return (
    <Card className="p-2 gap-4 flex justify-center items-center py-4">
      <div className="relative">
        <IoMdCube size={40} className="text-zinc-500" />
        <RiSearchFill
          size={20}
          className="text-muted-foreground absolute -bottom-0 text-zinc-600 -right-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <CardTitle className="text-lg">
          Oops, Produk yang kamu cari tidak ditemukan
        </CardTitle>
        <CardDescription>
          Coba cari kata kunci lain atau tambahkan produk baru
        </CardDescription>
      </div>
    </Card>
  );
}

export function ProductNotActiveFallback() {
  return (
    <Card className="p-2 gap-4 flex justify-center items-center py-4">
      <div className="relative">
        <IoMdCube size={40} className="text-zinc-500" />
        <RiSearchFill
          size={20}
          className="text-muted-foreground absolute -bottom-0 text-zinc-600 -right-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <CardTitle className="text-lg">
          Oops, saat ini belum ada produk yang aktif
        </CardTitle>
        <CardDescription>
          Aktifkan produk kamu atau buat produk baru
        </CardDescription>
      </div>
    </Card>
  );
}

export function ProductActiveFallback() {
  return (
    <Card className="p-2 gap-4 flex justify-center items-center py-4">
      <div className="relative">
        <IoMdCube size={40} className="text-zinc-500" />
        <RiSearchFill
          size={20}
          className="text-muted-foreground absolute -bottom-0 text-zinc-600 -right-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <CardTitle className="text-lg">Semua produk telah aktif</CardTitle>
        <CardDescription>
          Kamu bisa buat produk baru dan menyimpannya
        </CardDescription>
      </div>
    </Card>
  );
}
