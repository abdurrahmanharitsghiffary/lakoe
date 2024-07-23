import { TableCell, TableRow } from "@/components/ui/table";
import { FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { formatRupiah } from "@/utils/format-currency";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useConfirm } from "@/providers/alert-dialog-provider";
interface ProductProps {
  productName: string;
  variant: string;
  image: string;
  count: number;
  price: number;
  onIncrement: () => void;
  onDecrement: () => void;
  checked: boolean;
  onCheck: () => void;
  disabled: boolean;
}

export function ProductTable({
  productName,
  variant,
  image,
  count,
  price,
  onIncrement,
  onDecrement,
  checked,
  onCheck,
  disabled,
}: ProductProps) {
  const confirm = useConfirm();
  return (
    <TableRow className="text-xl">
      <TableCell>
        <div className="flex flex-row gap-2 px-1 py-1">
          <Checkbox
            className="h-[25px] w-[25px] mr-2 mt-10 border-blue-500 data-[state=checked]:bg-blue-500"
            checked={checked}
            onCheckedChange={onCheck}
            disabled={disabled}
          />
          <img src={image} alt="" className="h-[110px] w-[110px]" />
          <div className="flex flex-col px-3 my-[-6px]">
            {productName}
            <span className="text-lg text-muted-foreground">{variant}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium align-top ml-[30px]">
        {formatRupiah(price)}
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
              cancelProps: {
                variant: "outline",
                className: "border-blue-500 text-lg w-[100px] h-15",
              },
            });
          }}
        >
          <FaTrash className="h-5 w-5" color="blue" />
        </Button>
        <div className="flex flex-row gap-2 ml-3 w-[60px]">
          <Button
            variant={"outline"}
            className="px-2 border-blue-500"
            onClick={onDecrement}
            disabled={count <= 1 || disabled}
          >
            <FaMinus className="h-5 w-5" color="blue" />
          </Button>
          <Input
            name="jumlah"
            className="w-10 text-lg text-right hover:border-black"
            value={count}
          />
          <Button
            variant={"outline"}
            className="px-2 border-blue-500"
            onClick={onIncrement}
            disabled={disabled}
          >
            <FaPlus className="h-5 w-5" color="blue" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
