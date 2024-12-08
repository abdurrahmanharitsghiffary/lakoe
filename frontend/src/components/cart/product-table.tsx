import { TableCell, TableRow } from "@/components/ui/table";
import { FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { formatRupiah } from "@/utils/format-currency";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useConfirm } from "@/providers/alert-dialog-provider";
import { ProductType, SKUAttribute } from "@/types/cart";

interface ProductProps {

  storeId: number;
  product: ProductType;
  onIncrement: (storeId: number, productId: number, attributes: SKUAttribute[]) => void;
  onDecrement: (storeId: number, productId: number, attributes: SKUAttribute[]) => void;
  onProductCheck: (storeId: number, productId: number, attributes: SKUAttribute[]) => void;
  storeDisabled: boolean;
  onProductDelete: (cartId: string, skuId: number) => void;
  cartId: string;
}

export function ProductTable({ storeId, product, onIncrement, onDecrement, onProductCheck, storeDisabled,onProductDelete,cartId }: ProductProps) {
  const confirm = useConfirm()
  return (
    
      <TableRow className="text-2xl">
      <TableCell className="w-[600px]" >
        <div className="flex flex-row gap-2 px-1 py-1">
          <Checkbox className="h-[25px] w-[25px] mr-2 mt-10 border-blue-500 data-[state=checked]:bg-blue-500" checked={product.checked} onCheckedChange={() => onProductCheck(storeId, product.id, product.attributes)} disabled={storeDisabled} />
          <img
            src={product.image}
            alt=""
            className="h-[110px] w-[110px]"
          />
          <div className="flex flex-col pl-3 pr-1 my-[-6px]">
            {product.name}
            {product.attributes.map(attr => (
              <div key={attr.attribute.name}>
                <span className="text-lg">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium align-top ml-[30px]">
        {formatRupiah(product.price)}
      </TableCell>
      <TableCell className="align-top flex">
        <Button
          variant={"outline"}
          className="px-2 border-blue-500"
          onClick={async () => {
            await confirm({
              title: "Hapus Produk",
              body: "Apakah kamu yakin ingin menghapus produk ini dari keranjang?",
              actionButton: "Ya",
              cancelButton: "Tidak",

              actionProps: {
                variant: "lakoePrimary",
                className: "text-center text-lg  w-[100px] h-15",
              },
              cancelProps: { variant: "outline", className: "border-blue-500 text-lg w-[100px] h-15" },
            }),onProductDelete(cartId, product.skuId)
          }}
        >
          <FaTrash className="h-5 w-5" color="blue" />
        </Button>
        <div className="flex flex-row gap-2 ml-3 w-[60px]">
          <Button
            variant={"outline"}
            className="px-2 border-blue-500"

            onClick={() => onDecrement(storeId, product.id, product.attributes)}
            disabled={product.count <= 1 || storeDisabled}
          >
            <FaMinus className="h-5 w-5" color="blue" />
          </Button>
          <Input
            name="jumlah"
            className="w-10 text-lg text-right hover:border-black"
            value={product.count}

          />
          <Button
            variant={"outline"}
            className="px-2 border-blue-500"

            onClick={() => onIncrement(storeId, product.id, product.attributes)}
            disabled={storeDisabled}
          >
            <FaPlus className="h-5 w-5" color="blue" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
