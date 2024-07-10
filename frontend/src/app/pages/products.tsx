import LakoeCheckbox from "@/components/checkbox/lakoe";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useGetProducts } from "@/features/products/api/get-products";
import { CardProduct } from "@/features/products/components/card-product";
import { useConfirmDeleteProduct } from "@/features/products/hooks/use-confirm-delete-product";
import { useConfirmNonactiveProduct } from "@/features/products/hooks/use-confirm-nonactive-product";
import { cn } from "@/lib/utils";
import { parseStrBool } from "@/utils/parse-str-bool";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function ProductsPage() {
  const confirm = useConfirmDeleteProduct();
  const confirmNonactive = useConfirmNonactiveProduct();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get("q") || "";
  const active = searchParams.get("active") || "";

  const { data, isLoading } = useGetProducts({
    isActive: active === "all" ? undefined : parseStrBool(active),
  });

  const getCheckedProducts = () => {
    return (data?.data ?? []).map((product) => ({
      isChecked: false,
      id: product.id,
    }));
  };

  const [checkedProducts, setCheckedProducts] = useState<
    { isChecked: boolean; id: number }[]
  >(getCheckedProducts());

  useEffect(() => {
    if (data?.data) {
      setCheckedProducts(getCheckedProducts());
    }
  }, [data?.data]);

  const handleValueChange = (type: string) => {
    navigate({
      search: "?active=" + type,
    });
  };

  const handleCheckedChange = (checked: boolean) => {
    setCheckedProducts((c) => c.map((v) => ({ ...v, isChecked: checked })));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({ search: "?q=" + e.target.value });
  };

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full">
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
            defaultValue="all"
            onValueChange={handleValueChange}
            value={active}
          >
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="true"
                className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none "
              >
                Aktif
              </TabsTrigger>
              <TabsTrigger
                value="false"
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
              {data?.data?.length} Produk
            </Typography>
            <div className="flex gap-2 items-center h-8">
              {checkedProducts.some((v) => v.isChecked === true) && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-6 h-6"
                    onClick={async () => {
                      await confirm(
                        checkedProducts.filter(
                          (product) => product.isChecked === true
                        ).length ?? 0
                      );
                    }}
                  >
                    <BiTrash />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full h-6"
                    onClick={async () => {
                      await confirmNonactive(
                        checkedProducts.filter(
                          (product) => product.isChecked === true
                        ).length ?? 0
                      );
                    }}
                  >
                    Nonaktifkan Produk
                  </Button>
                </>
              )}
              <LakoeCheckbox
                id="select-all"
                checked={checkedProducts.some((pr) => pr.isChecked === true)}
                label="Pilih semua"
                onCheckedChange={handleCheckedChange}
              />
            </div>
          </div>
          <CardContent className="grid grid-cols gap-3 px-3">
            {(data?.data ?? []).map((product, i) => (
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
                product={product}
                key={product?.id}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
