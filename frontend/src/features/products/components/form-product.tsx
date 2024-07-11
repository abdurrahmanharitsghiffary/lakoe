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
import { InputForm } from "./input/input-form";
// import { useAddProduct } from "../hook/use-add-product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ProductFileInput } from "@/components/input/product-input";
import { useAddProduct } from "../hooks/use-add-product";

export function FormProduct() {
  const { form, onSubmit } = useAddProduct();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-center">
            <Card className="w-full">
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
                render={({ field: { onChange, value, ...field } }) => (
                  <div className="m-3">
                    <Label>Kategori</Label>
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          value={value?.[0] ?? ""}
                          onValueChange={(value) => onChange([value])}
                        >
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
            <Card className="w-full relative">
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
                    <FormMessage className=" mt-2" />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <div className="m-3">
                    <Label>Foto Produk</Label>
                    <div className="flex gap-2 overflow-x-auto hide-sc">
                      <ProductFileInput>Foto 1</ProductFileInput>
                      <ProductFileInput>Foto 2</ProductFileInput>
                      <ProductFileInput>Foto 3</ProductFileInput>
                      <ProductFileInput>Foto 4</ProductFileInput>
                      <ProductFileInput>Foto 5</ProductFileInput>
                    </div>
                    <FormMessage className="pt-2" />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full">
              <h1 className="m-4 font-bold text-xl">Harga</h1>
              <FormField
                control={form.control}
                name="price"
                render={({ field: { onChange, ...field } }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          type="number"
                          label="Harga"
                          onChange={(e) => onChange(+e.target.value)}
                          placeholder="Masukkan Harga Satuan Barang"
                          startAdornment="Rp."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-4 mb-2" />
                  </>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full">
              <h1 className="m-4 font-bold text-xl">Minimal Pembelian</h1>
              <FormField
                control={form.control}
                name="minimumOrder"
                render={({ field: { onChange, ...field } }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Minimal Pembelian"
                          placeholder="0"
                          {...field}
                          type="number"
                          onChange={(e) => onChange(+e.target.value)}
                          endAdornment="Produk"
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ms-4 mb-2" />
                  </>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full h-44 relative">
              <h1 className="m-4  font-bold text-xl ">Pengelolaan Produk</h1>
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field: { onChange, ...field } }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <InputForm
                            type="number"
                            label="Stok Produk"
                            onChange={(e) => onChange(+e.target.value)}
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
                {/* <InputForm
                  label="SKU (Stock Keeping Unit)"
                  placeholder="Masukkan Jumlah SKU"
                /> */}
              </div>
            </Card>
          </div>

          <div className="flex justify-center w-full">
            <Card className="w-full">
              <h1 className="m-4 font-bold text-xl ">Berat dan Pengiriman</h1>
              <FormField
                control={form.control}
                name="weightInGram"
                render={({ field: { onChange, ...field } }) => (
                  <div>
                    <FormItem>
                      <FormControl>
                        <InputForm
                          type="number"
                          onChange={(e) => onChange(+e.target.value)}
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
              <div className="flex flex-wrap">
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
            <Card className="w-full">
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
