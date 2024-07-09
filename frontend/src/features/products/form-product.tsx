import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue } from "@radix-ui/react-select";
// import { CiCirclePlus } from "react-icons/ci";
import { RiImageAddLine } from "react-icons/ri";
import { InputForm } from "./components/input/input-form";

export function FormProduct() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full mt-2 mx-4">
          <h1 className="m-4 font-bold text-xl">Informasi Produk</h1>
          <InputForm label="Nama Produk" placeholder="Masukkan nama produk" />
          <InputForm
            label="URL halaman checkout"
            placeholder="Masukkan URL halaman checkout"
            startAdornment="lakoe.store/"
          />

          <div className="m-3">
            <Label>Kategori</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pakaian">Pakaian</SelectItem>
                <SelectItem value="celana">Celana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-full m-4 ">
          <h1 className="m-4 font-bold text-xl ">Detail Produk</h1>
          <div className="m-3">
            <Label>Deskripsi</Label>
            <Textarea
              placeholder="Masukkan Deskripsi Lengkap Produk Kamu"
              className="resize-none h-32"
            />
          </div>
          <div className="m-3">
            <Label>Foto Produk</Label>
            <Input placeholder="foto 1" type="file" icon={<RiImageAddLine />} />
          </div>
        </Card>
      </div>

      {/* <div className="flex justify-center">
        <Card className="w-2/5 my-4">
          <div className="flex">
            <div className="">
              <h1 className="m-4 font-bold text-xl ">Varian Produk</h1>
              <p className="m-4 text-slate-500 text-sm">
                Tambah varian agar pembeli dapat memilih produk yang sesuai
              </p>
            </div>
            <Button className="my-8 mx-2 px-4 bg-white text-black rounded-full hover:bg-black hover:text-white">
              <CiCirclePlus size={25} /> Tambah Produk
            </Button>
          </div>
        </Card>
      </div> */}

      <div className="flex justify-center">
        <Card className="w-full m-4">
          <h1 className="m-4 font-bold text-xl ">Harga</h1>
          <InputForm
            label="Harga"
            placeholder="Masukkan Harga Satuan Barang"
            startAdornment="Rp."
          />
          <InputForm
            label="Minimal Pembelian"
            placeholder="1"
            endAdornment="Produk"
          />
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-full m-4">
          <h1 className="m-4 font-bold text-xl ">Pengelolaan Produk</h1>
          <div className="flex justify-between">
            <InputForm
              label="Stok Produk"
              placeholder="Masukkan jumlah stok"
              className="w-full"
            />
            <InputForm
              label="SKU (Stock Keeping Unit)"
              placeholder="Masukkan Jumlah SKU"
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-center w-full">
        <Card className="w-full m-4 ">
          <h1 className="m-4 font-bold text-xl ">Berat dan Pengiriman</h1>
          <InputForm
            label="Berat Produk"
            placeholder="Masukkan berat produk"
            endAdornment="Gram"
          />
          <div className="flex-col">
            <InputForm
              label="Ukuran Produk"
              placeholder="Masukkan panjang"
              endAdornment="cm"
            />
            <InputForm placeholder="Masukkan lebar" endAdornment="cm" />
            <InputForm placeholder="Masukkan tinggi" endAdornment="cm" />
          </div>
        </Card>
      </div>

      <div className="flex justify-center ">
        <Card className="w-full m-4 ">
          <div className="flex justify-between">
            <Button className="m-4 bg-white text-black rounded-full hover:bg-black hover:text-white text-xs">
              Preview Halaman Checkout
            </Button>
            <div className="flex  m-4 gap-2 ">
              <Button className="rounded-full bg-white text-black hover:bg-black hover:text-white">
                Batal
              </Button>
              <Button className="rounded-full bg-blue-500 text-white">
                Simpan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
