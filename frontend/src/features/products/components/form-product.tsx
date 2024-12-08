import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { InputForm, inputVariantProps } from "./input/input-form";
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
import { ShadcnControlled } from "@/components/input/shadcn-controlled";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { MultipleSelector } from "@/components/ui/multi-select";

export function FormProduct() {
  const {
    form,
    onSubmit,
    skusFields: { fields },
    attributes,
    setAttributes,
  } = useAddProduct();
  console.log(attributes, "ATTR");
  const {
    watch,
    formState: { errors },
  } = form;
  const productName = watch("name");
  const imageError = errors?.images?.root?.message ?? "";
  const [newVariant, setNewVariant] = useState("");

  const handleVariantFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newVariant) return;
    setAttributes((c) => [
      ...c,
      { name: newVariant.toUpperCase(), values: [] },
    ]);
    setNewVariant("");
  };

  const handleInputVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVariant(e.target.value);
  };

  return (
    <>
      <form id="add-variant-form" onSubmit={handleVariantFormSubmit}></form>
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
              {/* <FormField
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
              /> */}

              <FormField
                control={form.control}
                name="categories"
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

              <div className="flex flex-col gap-3">
                <Label>Foto Produk</Label>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <ProductFileInput
                        control={form.control}
                        name={`images.${i}`}
                      >
                        Foto {i + 1}
                      </ProductFileInput>
                    ))}
                </div>
                <p className="text-sm font-medium text-destructive">
                  {imageError}
                </p>
              </div>
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
            </div>
            <Input
              value={newVariant}
              disabled={attributes.length > 2}
              form="add-variant-form"
              onChange={handleInputVariantChange}
              className={cn(inputVariantProps({ focus: "lakoePrimary" }))}
              placeholder="Ketik variant yg ingin dibuat"
            />
            <div className="flex flex-col gap-8 relative">
              {attributes.map((attr) => (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center w-full justify-between">
                    <h3 className="font-semibold">{attr.name}</h3>
                    <Button
                      tabIndex={-1}
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setAttributes((c) => {
                          return c.filter((cc) => cc.name !== attr.name);
                        });
                      }}
                    >
                      <BiTrash size={18} />
                    </Button>
                  </div>
                  <MultipleSelector
                    placeholder={`Ketik opsi baru untuk ${attr.name}`}
                    maxSelected={5}
                    hidePlaceholderWhenSelected
                    creatable
                    value={attr.values.map((atr) => ({
                      value: atr,
                      label: atr,
                    }))}
                    onChange={(option) => {
                      setAttributes((c) => {
                        return c.map((cc) => {
                          if (cc.name === attr.name) {
                            const unique = new Set(
                              Array.from(option).map((opt) =>
                                opt.value.toUpperCase()
                              )
                            );
                            return {
                              ...cc,
                              values: Array.from(unique),
                            };
                          }
                          return cc;
                        });
                      });
                    }}
                  />
                </div>
              ))}
            </div>
            {attributes?.length > 0 && `Found ${fields?.length} combinations`}
            <div className="w-full flex flex-col gap-12">
              {attributes?.length > 0 &&
                fields.map((combination, i) => {
                  const attributeValue = (combination?.skuAttribute ?? [])
                    .map((comb) => `${comb.value}`)
                    .join(", ");

                  return (
                    <div key={attributeValue} className="flex flex-col">
                      <div className="flex flex-col gap-4">
                        <div className="font-semibold text-xl flex gap-4 items-center text-center justify-between">
                          <h2 className="capitalize text-base font-semibold">
                            {productName} {productName && "-"} {attributeValue}
                          </h2>
                          <div className="flex gap-4 items-center text-base">
                            <Controller
                              name={`skus.${i}.isActive`}
                              render={({
                                field: { name, onChange, value },
                              }) => (
                                <>
                                  {value ? "Aktif" : "Nonaktif"}
                                  <Switch
                                    onCheckedChange={(e) => onChange(e)}
                                    name={name}
                                    checked={value}
                                    className="data-[state=checked]:bg-lakoe-primary"
                                  />
                                </>
                              )}
                            />
                          </div>
                        </div>
                        <ShadcnControlled
                          type="number"
                          label="Harga"
                          isRequired
                          startAdornment="Rp."
                          control={form.control}
                          name={`skus.${i}.price`}
                        />
                        <div className="flex w-full gap-4">
                          <ShadcnControlled
                            className="w-full"
                            type="number"
                            isRequired
                            label="Stok Produk"
                            control={form.control}
                            name={`skus.${i}.stock`}
                          />
                          <ShadcnControlled
                            className="w-full"
                            type="number"
                            label="Berat Produk"
                            endAdornment="gram"
                            isRequired
                            control={form.control}
                            name={`skus.${i}.weightInGram`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>

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
          {attributes.length === 0 && (
            <>
              <div className="flex justify-center">
                <Card className="w-full flex flex-col gap-4 p-4">
                  <h1 className="font-bold text-xl">Harga</h1>
                  <FormField
                    control={form.control}
                    name="skus.0.price"
                    render={({ field: { onChange, ...field } }) => (
                      <div className="flex flex-col">
                        <FormItem>
                          <FormControl>
                            <InputForm
                              onChange={(e) => onChange(+e.target.value)}
                              isRequired
                              type="number"
                              label="Harga"
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
                <Card className="p-4 w-full relative flex flex-col gap-4">
                  <h1 className="font-bold text-xl">Pengelolaan Produk</h1>
                  <FormField
                    control={form.control}
                    name="skus.0.stock"
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
                </Card>
              </div>

              <div className="flex justify-center w-full">
                <Card className="w-full p-4 flex flex-col gap-4">
                  <h1 className="font-bold text-xl ">Berat dan Pengiriman</h1>
                  <div className="flex flex-wrap gap-4">
                    <FormField
                      control={form.control}
                      name="skus.0.weightInGram"
                      render={({ field: { onChange, ...field } }) => (
                        <div className="flex flex-col">
                          <FormItem>
                            <FormControl>
                              <InputForm
                                type="number"
                                label="Berat Produk"
                                endAdornment="gram"
                                onChange={(e) => onChange(+e.target.value)}
                                placeholder="Masukkan berat produk"
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
                /> */}
                  </div>
                </Card>
              </div>
            </>
          )}

          <div className="flex justify-center ">
            <Card className="w-full p-4">
              <div className="flex justify-between">
                {/* <Button variant={"outline"} className="rounded-full">
                  Preview Halaman Checkout
                </Button> */}
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
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
}
