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

interface ProductType {
  id: number;
  name: string;
  image: string;
  count: number;
  variant: string;
  price: number;
  checked: boolean;
}

interface ProductProps {
  storeName: string;
  products: ProductType[];
  onIncrement: (productId: number) => void;
  onDecrement: (productid: number) => void;
  checked: boolean;
  onStoreCheck: () => void;
  onProductCheck: (productId: number) => void;
  disabled: boolean;
}

export function Store({
  storeName,
  products,
  onIncrement,
  onDecrement,
  checked,
  onStoreCheck,
  onProductCheck,
  disabled,
}: ProductProps) {
  return (
    <div className="flex flex-row w-full mt-6">
      <div className="w-full">
        <Card className="mx-4 rounded-xl">
          <Table className="bg-white text-xl mt-2">
            <TableHeader>
              <TableRow className="text-[15px] hover:bg-white">
                <TableHead className="flex flex-row items-center space-x-2">
                  <span className="px-1">
                    <Checkbox
                      className="h-[25px] w-[25px] border-blue-500 data-[state=checked]:bg-blue-500"
                      checked={checked}
                      onCheckedChange={onStoreCheck}
                      disabled={disabled}
                    />
                  </span>
                  <span className="px-1 pb-2">
                    <FaStore color="blue" className="h-6 w-6" />
                  </span>
                  <span className="pb-3 text-lg">{storeName}</span>
                </TableHead>
                <TableHead className="pt-3 pb-4"></TableHead>
                <TableHead className="pt-3 pb-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <ProductTable
                  key={product.id}
                  image={product.image}
                  productName={product.name}
                  count={product.count}
                  variant={product.variant}
                  price={product.price}
                  onIncrement={() => onIncrement(product.id)}
                  onDecrement={() => onDecrement(product.id)}
                  checked={product.checked}
                  onCheck={() => onProductCheck(product.id)}
                  disabled={disabled}
                />
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-row px-4 border-t-2 py-7"></div>
        </Card>
      </div>
    </div>
  );
}
