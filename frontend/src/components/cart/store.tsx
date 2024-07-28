import { ProductTable } from "./product-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { FaStore } from "react-icons/fa";
import { StoreType, SKUAttribute } from "@/types/cart";

interface StoreProps {
  stores: StoreType[];
  setStores: React.Dispatch<React.SetStateAction<StoreType[]>>;
  onIncrement: (
    storeId: number,
    productId: number,
    attributes: SKUAttribute[]
  ) => void;
  onDecrement: (
    storeId: number,
    productId: number,
    attributes: SKUAttribute[]
  ) => void;
  onStoreCheck: (storeId: number) => void;
  onProductCheck: (
    storeId: number,
    productId: number,
    attributes: SKUAttribute[]
  ) => void;
  onProductDelete: (cartId: string, skuId: number) => void;
}

export function Store({
  stores,
  onIncrement,
  onDecrement,
  onStoreCheck,
  onProductCheck,
  onProductDelete,
}: StoreProps) {
  return (
    <div className="flex flex-row w-full mt-6">
      <div className="basis-3/4">
        {stores.map((store) => (
          <Card className="ml-3 mb-6 rounded-xl">
            <Table className="bg-white text-xl w-[1190px] mt-2" key={store.id}>
              <TableHeader>
                <TableRow className="text-[15px] hover:bg-white">
                  <TableHead className="flex flex-row items-center space-x-2">
                    <span className="px-1">
                      <Checkbox
                        className="h-[25px] w-[25px] border-blue-500 data-[state=checked]:bg-blue-500"
                        checked={store.checked}
                        onCheckedChange={() => onStoreCheck(store.id)}
                        disabled={store.disabled}
                      />
                    </span>
                    <span className="px-1 pb-2">
                      <FaStore color="blue" className="h-6 w-6" />
                    </span>
                    <span className="pb-3 text-lg">{store.name}</span>
                  </TableHead>
                  <TableHead className="pt-3 pb-4"></TableHead>
                  <TableHead className="pt-3 pb-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {store.products.map((product) => (
                  <ProductTable
                    key={`${product.id}-${JSON.stringify(product.attributes)}`}
                    storeId={store.id}
                    product={product}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onProductCheck={onProductCheck}
                    storeDisabled={store.disabled}
                    onProductDelete={onProductDelete}
                    cartId={store.cartId}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-row px-4 border-t-2 py-7"></div>
          </Card>
        ))}
      </div>
    </div>
  );
}
