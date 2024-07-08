import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

type CardProductProps = {
  src: string;
  sku: string;
  price: number;
  title: string;
  stock: number;
};

export function CardProduct({
  price,
  sku,
  src,
  title,
  stock,
}: CardProductProps) {
  return (
    <Card className="p-2 gap-2 flex">
      <img
        src={src}
        className="aspect-square object-cover object-center max-w-[90px] max-h-[90px]"
      />
      <div className="flex flex-col justify-between">
        <CardTitle className="text-md mt-0">{title}</CardTitle>
        <CardDescription className="!text-sm font-semibold">
          <span className="text-black">Rp. {price}</span> • Stok {stock} • SKU{" "}
          {sku}
        </CardDescription>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" className="rounded-full">
            Ubah Harga
          </Button>
          <Button size="sm" variant="outline" className="rounded-full">
            Ubah Stok
          </Button>
          <Button size="sm" variant="outline" className="rounded-full">
            •••
          </Button>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        <Checkbox className="border-lakoe-primary data-[state=checked]:bg-lakoe-primary data-[state=checked]:text-white" />
        <Switch className="data-[state=checked]:bg-lakoe-primary" />
      </div>
    </Card>
  );
}
