import { LakoeCheckbox } from "@/components/checkbox/lakoe";
import { List } from "@/components/list";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultipleSelector, Option } from "@/components/ui/multi-select";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Typography } from "@/components/ui/typography";
import { useGetProducts } from "@/features/products/api/get-products";
import { CardProduct } from "@/features/products/components/card-product";
import {
  ProductActiveFallback,
  ProductNotActiveFallback,
  ProductNotFoundFallback,
} from "@/features/products/components/fallback";
import { useConfirmDeleteProduct } from "@/features/products/hooks/use-confirm-delete-product";
import { useConfirmNonactiveProduct } from "@/features/products/hooks/use-confirm-nonactive-product";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { getAllSearchParams } from "@/utils/get-all-search-param";
import { parseStrBool } from "@/utils/parse-str-bool";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiTrash } from "react-icons/bi";
import { GoPlusCircle } from "react-icons/go";
import { LuPackageSearch } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { inputVariantProps } from "@/features/products/components/input/input-form";
import { TabItem, Tabs } from "@/components/tabs";
import { useGetCategories } from "@/features/categories/api/get-categories";

const getCheckedProducts = (products: Product[]) => {
  return products.map((product) => ({
    isChecked: false,
    id: product.id,
  }));
};

// const categoryOptions: Option[] = [
//   { label: "Pakaian", value: "pakaian" },
//   { label: "Celana", value: "celana" },
//   { label: "Elektronik", value: "elektronik" },
//   { label: "Makanan", value: "makanan" },
//   { label: "Minuman", value: "minuman" },
// ];

const tabs: TabItem[] = [
  { label: "Semua", value: "all" },
  { label: "Aktif", value: "true" },
  { label: "Nonaktif", value: "false" },
];

export function ProductsPage() {
  const confirm = useConfirmDeleteProduct();
  const confirmNonactive = useConfirmNonactiveProduct();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("lowest_price");
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const { data: categoryData } = useGetCategories();

  const categories = categoryData?.data ?? [];

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));
  console.log(selectedCategories, "CATEGORY");
  const searchCategories = (value: string) => {
    return new Promise<Option[]>((resolve) => {
      resolve(
        categoryOptions.filter((option) =>
          option?.label?.toLowerCase()?.includes(value?.toLowerCase())
        )
      );
    });
  };

  const q = searchParams.get("q") || "";
  const [s, setS] = useState(q);
  const [dS] = useDebounce(s, 300);
  const active = searchParams.get("active") || "all";

  const { data, isLoading } = useGetProducts({
    options: {
      q,
      categories: selectedCategories
        .map((category) => category.value)
        .join(","),
      sort_by: sortBy,
      active: active === "all" ? undefined : parseStrBool(active),
    },
  });

  const [checkedProducts, setCheckedProducts] = useState<
    { isChecked: boolean; id: number }[]
  >(getCheckedProducts(data?.data ?? []));

  const isCheckedSome = useMemo(
    () => checkedProducts.some((v) => v.isChecked === true),
    [checkedProducts]
  );

  const productData = data?.data ?? [];

  const checkedProductLength = useMemo(
    () =>
      checkedProducts.filter((product) => product.isChecked === true).length ??
      0,
    [checkedProducts]
  );

  const handleValueChange = (type: string) => {
    searchParams.set("active", type);
    navigate({
      search: "?" + getAllSearchParams(searchParams),
    });
  };

  const handleCheckedChange = (checked: boolean) => {
    setCheckedProducts((c) => c.map((v) => ({ ...v, isChecked: checked })));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setS(e.target.value);
  };

  useEffect(() => {
    searchParams.set("q", dS);
    navigate({ search: "?" + getAllSearchParams(searchParams) });
  }, [dS]);

  const handleDeleteAllClick = async () => {
    await confirm(checkedProductLength);
  };

  const handleUnactiveAllClick = async () => {
    await confirmNonactive(checkedProductLength);
  };

  const getIsProductChecked = useCallback(
    (product: Product) => {
      return checkedProducts.find((d) => d.id === product.id)?.isChecked
        ? true
        : false;
    },
    [checkedProducts]
  );

  const handleProductCheckedChange = useCallback(
    (state: { isChecked: boolean; id: number }) =>
      setCheckedProducts((c) => {
        return c.map((item) => {
          if (item.id === state.id) return { ...c, ...state };
          return item;
        });
      }),
    []
  );

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };

  const productFallback = q ? (
    <ProductNotFoundFallback />
  ) : parseStrBool(active) ? (
    <ProductActiveFallback />
  ) : (
    <ProductNotActiveFallback />
  );

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className="flex justify-center">
        <Card className="w-full">
          <div className="flex justify-between">
            <h1 className="text-xl m-4 font-bold">Daftar Produk</h1>
            <Link
              to="/seller/products/create"
              className={cn(
                buttonVariants({ variant: "lakoePrimary" }),
                "m-4 rounded-full"
              )}
            >
              <GoPlusCircle size={25} />
              <span className="ml-2">Tambah Produk</span>
            </Link>
          </div>
          <Tabs
            key="productTabs"
            items={tabs}
            defaultValue="all"
            onValueChange={handleValueChange}
            value={active}
          />
          <div className="flex justify-between m-3 gap-4">
            <Input
              className={inputVariantProps({ focus: "lakoePrimary" })}
              value={s}
              onChange={handleSearch}
              placeholder="Cari produk"
              style={{ flex: 2 }}
              icon={<LuPackageSearch size={20} />}
            />
            <MultipleSelector
              maxSelected={3}
              hidePlaceholderWhenSelected
              className={cn(
                inputVariantProps({ focus: "lakoePrimary" }),
                "flex-wrap"
              )}
              onChange={setSelectedCategories}
              options={categoryOptions}
              onSearch={searchCategories}
              delay={300}
              placeholder="Semua Kategori"
              commandProps={{ style: { flex: 1 } }}
            />
            <Select onValueChange={handleSelectChange} value={sortBy}>
              <SelectTrigger style={{ flex: 1 }}>
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest_price">Harga Termahal</SelectItem>
                <SelectItem value="lowest_price">Harga Terendah</SelectItem>
                <SelectItem value="highest_stock">Stock Terbanyak</SelectItem>
                <SelectItem value="lowest_stock">Stock Terendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex px-3 pb-2 justify-between items-center">
            <Typography variant="p" className="font-semibold !text-sm">
              {data?.data?.length} Produk
            </Typography>
            <div className="flex gap-2 items-center h-8">
              {isCheckedSome && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-6 h-6"
                    onClick={handleDeleteAllClick}
                  >
                    <BiTrash />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full h-6"
                    onClick={handleUnactiveAllClick}
                  >
                    Nonaktifkan Produk
                  </Button>
                </>
              )}
              <LakoeCheckbox
                id="select-all"
                checked={isCheckedSome}
                label="Pilih semua"
                onCheckedChange={handleCheckedChange}
              />
            </div>
          </div>
          <CardContent className="grid grid-cols gap-3 px-3">
            <List
              data={productData}
              noItemsContent={productFallback}
              isLoading={isLoading}
              loader={
                <div className="mx-auto">
                  <LoadingSpinner className="text-lakoe-primary" />
                </div>
              }
            >
              {productData.map((product) => (
                <CardProduct
                  isChecked={getIsProductChecked(product)}
                  onCheckedChange={handleProductCheckedChange}
                  product={product}
                  key={product?.id}
                />
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
