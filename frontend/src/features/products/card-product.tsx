import ProductDialogActivation from "@/components/dialog/product-dialog-activation";
import { Image } from "@/components/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export type ProductVariant = {
  name: string;
  stock: number;
  price: number;
};

export type CardProductProps = {
  id: number;
  src: string;
  sku: string;
  price: number;
  title: string;
  isActive: boolean;
  stock: number;
  onCheckedChange?: (args: { isChecked: boolean; id: number }) => void;
  isChecked?: boolean;
  productVariants?: ProductVariant[];
};

export function CardProduct({
  price,
  isChecked,
  onCheckedChange,
  sku,
  isActive,
  src,
  id,
  title,
  stock,
  productVariants = [],
}: CardProductProps) {
  const { toast } = useToast();
  const [isSwitched, setIsSwitched] = useState(isActive);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = (isSuccess: boolean) => {
    console.log(isSuccess);
    if (!isSuccess) return;
    setIsSwitched(true);
  };

  const handleStatusChange = (isSwitched: boolean) => {
    console.log(isSwitched);
    if (isSwitched && productVariants?.length > 1) {
      setIsOpen(true);
      return;
    }
    if (isSwitched)
      toast({
        description: "Produk berhasil diaktifkan!",
        className: "bg-zinc-950 text-white py-4",
      });
    setIsSwitched((c) => !c);
  };

  return (
    <Card className="p-2 gap-2 flex">
      <Image
        alt={title}
        src={src}
        className="aspect-square object-cover object-center w-[20%] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
      />
      <div className="flex flex-col gap-1 justify-between w-[65%]">
        {productVariants?.length > 1 && (
          <Badge className="rounded-sm w-fit bg-lakoe-primary">
            {productVariants?.length} Varian
          </Badge>
        )}
        <CardTitle className="text-md mt-0 truncate w-full">{title}</CardTitle>
        <CardDescription className="!text-sm font-semibold">
          <span className="text-black">Rp. {price}</span> • Stok {stock} • SKU{" "}
          {sku}
        </CardDescription>
        <div className="flex gap-1">
          {!isSwitched ? (
            <>
              <Button size="sm" variant="outline" className="rounded-full">
                Ubah Harga
              </Button>
              <Button size="sm" variant="outline" className="rounded-full">
                Ubah Stok
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-full">
              Edit Produk
            </Button>
          )}
          <Button size="sm" variant="outline" className="rounded-full">
            •••
          </Button>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        <Checkbox
          className="border-lakoe-primary data-[state=checked]:bg-lakoe-primary data-[state=checked]:text-white"
          checked={isChecked}
          onCheckedChange={(isChecked: boolean) => {
            if (onCheckedChange) onCheckedChange({ isChecked, id });
          }}
        />
        <Switch
          checked={isSwitched}
          onCheckedChange={handleStatusChange}
          className="data-[state=checked]:bg-lakoe-primary"
        />
      </div>
      <ProductDialogActivation
        isOpen={isOpen}
        onOpen={setIsOpen}
        onConfirm={handleConfirm}
      />
    </Card>
  );
}
