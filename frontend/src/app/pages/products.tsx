import LakoeCheckbox from "@/components/checkbox/lakoe";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import {
//   MultiSelector,
//   MultiSelectorContent,
//   MultiSelectorInput,
//   MultiSelectorItem,
//   MultiSelectorList,
//   MultiSelectorTrigger,
// } from "@/components/ui/multi-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { dummyProducts } from "@/data/dummy-products";
import { CardProduct } from "@/features/products/card-product";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type TabType = "semua" | "aktif" | "nonaktif";

export function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const t = (searchParams.get("t") || "semua") as TabType;
  const q = searchParams.get("q") || "";

  const [checkedProducts, setCheckedProducts] = useState<
    { isChecked: boolean; id: number }[]
  >(dummyProducts.map((product) => ({ isChecked: false, id: product.id })));

  const handleValueChange = (type: string) => {
    navigate({ search: "?t=" + type });
  };

  const handleCheckedChange = (checked: boolean) => {
    setCheckedProducts((c) => c.map((v) => ({ ...v, isChecked: checked })));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({ search: "?q=" + e.target.value });
  };

  const filteredProducts = dummyProducts.filter((product) => {
    if (t === "semua") return true;
    if (t === "nonaktif") return product.isActive === false;
    return product.isActive === true;
  });

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full m-4">
          <div className="flex justify-between">
            <h1 className="text-xl m-4 font-bold">Daftar Produk</h1>
            <Link
              to="/products/create"
              className={cn(
                buttonVariants(),
                "m-4 bg-btn-primary rounded-full"
              )}
            >
              <CiCirclePlus size={25} />
              <span className="ml-2">Tambah Produk</span>
            </Link>
          </div>
          <Tabs
            defaultValue="semua"
            onValueChange={handleValueChange}
            value={t}
          >
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
          <div className="flex justify-between m-3 gap-4">
            <Input
              value={q}
              onChange={handleSearch}
              placeholder="Cari produk"
              className="p-2 "
              style={{ flex: 2 }}
            />
            {/* <MultiSelector
              values={selectedCategories}
              onValuesChange={setSelectedCategories}
            >
              <MultiSelectorTrigger className="mt-0">
                <MultiSelectorInput placeholder="Semua kategori" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  <MultiSelectorItem value={"Pakaian"}>
                    Pakaian
                  </MultiSelectorItem>
                  <MultiSelectorItem value={"Celana"}>Celana</MultiSelectorItem>
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector> */}
            <Select>
              <SelectTrigger style={{ flex: 1 }}>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pakaian">Pakaian</SelectItem>
                <SelectItem value="celana">Celana</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger style={{ flex: 1 }}>
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Hari</SelectItem>
                <SelectItem value="month">Bulan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex px-3 pb-2 justify-between items-center">
            <Typography variant="p" className="font-semibold !text-sm">
              {dummyProducts.length} Produk
            </Typography>
            <LakoeCheckbox
              id="select-all"
              checked={checkedProducts.every((pr) => pr.isChecked === true)}
              label="Pilih semua"
              onCheckedChange={handleCheckedChange}
            />
          </div>
          <CardContent className="grid grid-cols gap-3 px-3">
            {filteredProducts.map((product, i) => (
              <CardProduct
                isChecked={checkedProducts?.[i]?.isChecked || false}
                onCheckedChange={(state) =>
                  setCheckedProducts((c) => {
                    return c.map((item) => {
                      if (item.id === state.id) return { ...c, ...state };
                      return item;
                    });
                  })
                }
                id={product.id}
                isActive={product.isActive}
                productVariants={[
                  { name: "xl", price: 20000, stock: 20 },
                  { name: "lg", price: 23000, stock: 11 },
                  { name: "sm", price: 20000, stock: 17 },
                ]}
                price={product.price}
                sku={product.sku}
                src="https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                stock={product.stock}
                title={product.title}
                key={product.id}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
