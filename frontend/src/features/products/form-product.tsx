import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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
// import { useAddProduct } from "../hook/use-add-product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useAddProduct } from "../hook/use-add-product";

import InputFileHidden from "@/components/ui/input-file-hidden";

export function FormProduct() {
  const { form, onSubmit } = useAddProduct();

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <Card className="w-full mt-2 mx-4">
              <h1 className="m-4 font-bold text-xl">Informasi Produk</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Nama Produk"
                          placeholder="Masukkan Nama"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-4"></FormMessage>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="URL halaman checkout"
                          placeholder="Masukkan URL halaman checkout"
                          startAdornment="lakoe.store/"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-4"></FormMessage>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <div className="m-3">
                    <Label>Kategori</Label>
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pakaian">Pakaian</SelectItem>
                            <SelectItem value="celana">Celana</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-2" />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full   m-4 relative">
              <h1 className="m-4 font-bold text-xl ">Detail Produk</h1>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div className="m-3">
                    <Label>Deskripsi</Label>
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan Deskripsi Lengkap Produk Kamu"
                          className="resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-2 mt-2" />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <div className="m-3">
                    <Label>Foto Produk</Label>
                    <div className="flex justify-between">
                      <FormItem>
                        <FormControl>
                          <div className="border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
                            <InputFileHidden {...field}>
                              <RiImageAddLine
                                size={60}
                                className="text-gray-400"
                              />
                              <p className="text-gray-400 ms-2">Foto 1</p>
                            </InputFileHidden>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute bottom-0 left-2" />
                      <div className="border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
                        <InputFileHidden>
                          <RiImageAddLine size={60} className="text-gray-400" />
                          <p className="text-gray-400 ms-2">Foto 2</p>
                        </InputFileHidden>
                      </div>
                      <div className="border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
                        <InputFileHidden>
                          <RiImageAddLine size={60} className="text-gray-400" />
                          <p className="text-gray-400 ms-2">Foto 3</p>
                        </InputFileHidden>
                      </div>
                      <div className="border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
                        <InputFileHidden>
                          <RiImageAddLine size={60} className="text-gray-400" />
                          <p className="text-gray-400 ms-2">Foto 4</p>
                        </InputFileHidden>
                      </div>
                      <div className="border-dashed border-2 border-gray-400 rounded-md w-40 h-36 flex justify-center items-center">
                        <InputFileHidden>
                          <RiImageAddLine size={60} className="text-gray-400" />
                          <p className="text-gray-400 ms-2">Foto 5</p>
                        </InputFileHidden>
                      </div>
                    </div>
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full m-4">
              <h1 className="m-4 font-bold text-xl ">Harga</h1>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Harga"
                          placeholder="Masukkan Harga Satuan Barang"
                          startAdornment="Rp."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-2" />
                  </>
                )}
              />
              <InputForm
                label="Minimal Pembelian"
                placeholder="1"
                endAdornment="Produk"
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full m-4 h-44 relative">
              <h1 className="m-4  font-bold text-xl ">Pengelolaan Produk</h1>
              <div className="flex justify-between ">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <InputForm
                            label="Stok Produk"
                            placeholder="Masukkan jumlah stok"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute  bottom-2 left-3 " />
                    </>
                  )}
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
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Berat Produk"
                          placeholder="Masukkan berat produk"
                          endAdornment="Gram"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-4" />
                  </div>
                )}
              />
              <div className="flex">
                <InputForm
                  label="Ukuran Produk"
                  placeholder="Masukkan panjang"
                  endAdornment="cm"
                />
                <InputForm
                  className="mt-6"
                  placeholder="Masukkan lebar"
                  endAdornment="cm"
                />
                <InputForm
                  className="mt-6"
                  placeholder="Masukkan tinggi"
                  endAdornment="cm"
                />
              </div>
            </Card>
          </div>

          <div className="flex justify-center ">
            <Card className="w-full m-4 ">
              <div className="flex justify-between">
                <Button className="m-4 border bg-white text-black rounded-full hover:bg-black hover:text-white text-xs">
                  Preview Halaman Checkout
                </Button>
                <div className="flex  m-4 gap-2 ">
                  <Button className="rounded-full bg-white text-black hover:bg-black hover:text-white">
                    Batal
                  </Button>
                  <Button
                    className="rounded-full bg-blue-500 text-white"
                    type="submit"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
}

{
  /* <div className="flex justify-center">
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
      </div> */
}
