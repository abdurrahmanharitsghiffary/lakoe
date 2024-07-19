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

import { DescInput } from "@/components/input/desc-input";

import { BiTrash } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { VariantForms } from "./input/variant-form";

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
            <Card className="p-4 w-full flex flex-col gap-4">
              <h1 className="font-bold text-xl">Informasi Produk</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Nama Produk"
                          placeholder="Masukkan Nama"
                          isRequired
                          focus={"lakoePrimary"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage></FormMessage>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="URL halaman checkout"
                          placeholder="Masukkan URL halaman checkout"
                          startAdornment="lakoe.store/"
                          isRequired
                          focus={"lakoePrimary"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage></FormMessage>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field: { onChange, value, ...field } }) => (
                  <div className="flex flex-col gap-2">
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
                    <FormMessage />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="p-4 w-full relative flex flex-col gap-4">
              <h1 className="font-bold text-xl ">Detail Produk</h1>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <DescInput
                          label="Deskripsi"
                          placeholder="Masukkan deskripsi produk"
                          isRequired
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="attachments"
                render={() => (
                  <div className="flex flex-col gap-3">
                    <Label>Foto Produk</Label>
                    <div className="flex gap-2 overflow-x-auto hide-sc">
                      <ProductFileInput>Foto 1</ProductFileInput>
                      <ProductFileInput>Foto 2</ProductFileInput>
                      <ProductFileInput>Foto 3</ProductFileInput>
                      <ProductFileInput>Foto 4</ProductFileInput>
                      <ProductFileInput>Foto 5</ProductFileInput>
                    </div>
                    <FormMessage />
                  </div>
                )}
              />
            </Card>
          </div>
          <Card className="p-4 flex flex-col gap-4">
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold items-center">
                  Variant Produk
                </h2>
                <p className="text-muted-foreground">
                  Tambah variant agar pembeli dapat memilih produk yang sesuai,
                  yuk!
                </p>
              </div>

              <Button className="flex gap-2 rounded-full" variant="outline">
                <BiTrash size={20} /> Hapus Variant
              </Button>
            </div>
            <div className="flex gap-2">
              <Button className="rounded-full" variant="outline">
                Warna
              </Button>
              <Button className="rounded-full" variant="outline">
                Ukuran
              </Button>
              <Button className="rounded-full" variant="outline">
                Ukuran Kemasan
              </Button>
              <Button className="rounded-full flex gap-2" variant="outline">
                <MdAddCircleOutline size={20} />
                Buat Tipe Varian
              </Button>
            </div>
            <div className="relative">
              <VariantForms />
            </div>
          </Card>

          <div className="flex justify-center">
            <Card className="w-full flex flex-col gap-4 p-4">
              <h1 className="font-bold text-xl">Harga</h1>
              <FormField
                control={form.control}
                name="price"
                render={({ field: { onChange, ...field } }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          isRequired
                          type="number"
                          label="Harga"
                          onChange={(e) => onChange(+e.target.value)}
                          placeholder="Masukkan Harga Satuan Barang"
                          startAdornment="Rp."
                          focus={"lakoePrimary"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="w-full p-4 flex flex-col gap-4">
              <h1 className="font-bold text-xl">Minimal Pembelian</h1>
              <FormField
                control={form.control}
                name="minimumOrder"
                render={({ field: { onChange, ...field } }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          label="Minimal Pembelian"
                          placeholder="0"
                          {...field}
                          type="number"
                          onChange={(e) => onChange(+e.target.value)}
                          endAdornment="Produk"
                          focus={"lakoePrimary"}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="p-4 w-full relative flex flex-col gap-4">
              <h1 className="font-bold text-xl">Pengelolaan Produk</h1>
              <FormField
                control={form.control}
                name="stock"
                render={({ field: { onChange, ...field } }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          type="number"
                          label="Stok Produk"
                          onChange={(e) => onChange(+e.target.value)}
                          placeholder="Masukkan jumlah stok"
                          className="w-full"
                          isRequired
                          focus={"lakoePrimary"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />

              {/* <InputForm
                  label="SKU (Stock Keeping Unit)"
                  placeholder="Masukkan Jumlah SKU"
                /> */}
            </Card>
          </div>

          <div className="flex justify-center w-full">
            <Card className="w-full p-4 flex flex-col gap-4">
              <h1 className="font-bold text-xl ">Berat dan Pengiriman</h1>
              <FormField
                control={form.control}
                name="weightInGram"
                render={({ field: { onChange, ...field } }) => (
                  <div className="flex flex-col">
                    <FormItem>
                      <FormControl>
                        <InputForm
                          type="number"
                          onChange={(e) => onChange(+e.target.value)}
                          label="Berat Produk"
                          placeholder="Masukkan berat produk"
                          endAdornment="Gram"
                          isRequired
                          focus={"lakoePrimary"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <div className="flex flex-wrap gap-4">
                <InputForm
                  label="Panjang"
                  placeholder="Masukkan panjang"
                  endAdornment="cm"
                  focus={"lakoePrimary"}
                />
                <InputForm
                  label="Lebar"
                  placeholder="Masukkan lebar"
                  endAdornment="cm"
                  focus={"lakoePrimary"}
                />
                <InputForm
                  label="Tinggi"
                  placeholder="Masukkan tinggi"
                  endAdornment="cm"
                  focus={"lakoePrimary"}
                />
              </div>
            </Card>
          </div>

          <div className="flex justify-center ">
            <Card className="w-full p-4">
              <div className="flex justify-between">
                <Button variant={"outline"} className="rounded-full">
                  Preview Halaman Checkout
                </Button>
                <div className="flex gap-2">
                  <Button variant={"outline"} className="rounded-full ">
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
