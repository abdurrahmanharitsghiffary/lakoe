import { UpdateProductSkuDialog } from "@/components/dialog/update-product-sku-dialog";
import { Image } from "@/components/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/product";
import { memo, useState } from "react";
import { ProductMenu } from "./product-menu";
import { useGetProductSkus } from "../api/get-product-skus";
import { useActivation } from "../api/activation";

export type CardProductProps = {
  onCheckedChange?: (args: { isChecked: boolean; id: number }) => void;
  isChecked?: boolean;
  product: Product | undefined;
};

function Comp({ isChecked, onCheckedChange, product }: CardProductProps) {
  console.log("RE RENDER");
  const [isSwitched, setIsSwitched] = useState(product?.isActive ?? false);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetProductSkus({
    productId: product?.id || -1,
  });
  const { activationAsync } = useActivation();

  const skus = data?.data ?? [];

  const handleStatusChange = async (isSwitched: boolean) => {
    if (!product?.id) return;
    setIsSwitched(isSwitched);
    await activationAsync({
      type: "product",
      ids: [product?.id || -1],
      isActive: isSwitched,
    });
  };

  return (
    <Card className="p-2 gap-2 flex">
      <Image
        alt={product?.name}
        src={product?.images?.[0]}
        className="aspect-square object-cover object-center min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
      />
      <div className="flex flex-col gap-1 justify-between w-[65%]">
        {(product?._count?.skus ?? 0) > 1 && (
          <Badge className="rounded-sm w-fit bg-lakoe-primary">
            {product?._count?.skus} Varian
          </Badge>
        )}
        <div className="flex flex-col gap-2">
          <CardTitle className="text-md mt-0 truncate w-full">
            {product?.name}
          </CardTitle>
          <CardDescription className="!text-sm font-semibold">
            <span className="text-black">
              Rp {skus?.[0]?.price}{" "}
              {skus?.length > 1 ? `- Rp ${skus?.slice(-1)?.[0]?.price}` : ""}
            </span>{" "}
            • Stok {skus?.reduce((a, { stock }) => a + stock, 0)} •
            {product?._count?.skus === 1
              ? ` SKU ${skus?.[0]?.sku}`
              : ` Total SKU (${product?._count?.skus})`}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button
            onClick={() => setIsOpen(true)}
            size="sm"
            variant="outline"
            className="rounded-full h-6"
          >
            Edit Produk
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            size="sm"
            variant="outline"
            className="rounded-full h-6"
          >
            Edit Variant Produk
          </Button>
          {/* <Button size="sm" variant="outline" className="rounded-full h-6">
            <GoPaperclip /> Lihat Halaman
          </Button> */}
          <ProductMenu product={product} />
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        <Checkbox
          className="border-lakoe-primary data-[state=checked]:bg-lakoe-primary data-[state=checked]:text-white"
          checked={isChecked}
          onCheckedChange={(isChecked: boolean) => {
            if (onCheckedChange)
              onCheckedChange({ isChecked, id: product?.id || -1 });
          }}
        />
        <Switch
          checked={isSwitched}
          onCheckedChange={handleStatusChange}
          className="data-[state=checked]:bg-lakoe-primary"
        />
      </div>
      <UpdateProductSkuDialog
        variants={skus}
        isOpen={isOpen}
        onOpen={setIsOpen}
      />
      {/* <ProductDialogChangePrice
        product={product}
        isOpen={isPriceChangeOpen}
        onOpen={setIsPriceChangeOpen}
      />
      <ProductDialogChangeStock
        product={product}
        isOpen={isStockChangeOpen}
        onOpen={setIsStockChangeOpen}
      /> */}
    </Card>
  );
}

const CardProduct = memo(Comp);

export { CardProduct };
