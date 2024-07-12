import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/providers/alert-dialog-provider";
import { Product } from "@/types/product";
import { BiDuplicate, BiEdit, BiTrash } from "react-icons/bi";

type Props = {
  product: Product | undefined;
};

export default function ProductMenu({ product }: Props) {
  const confirm = useConfirm();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="rounded-full h-6 w-6">
            •••
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <BiEdit className="mr-2" /> <span>Edit Produk</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BiDuplicate className="mr-2" /> <span>Duplikat Produk</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await confirm({
                title: `Hapus Produk ${product?.name}?`,
                body: `Produk ${product?.name} - ${product?.variants?.[0]?.name} akan dihapus. \n
Produk yang dihapus tidak akan dibatalkan. Pastikan produk yang kamu pilih itu adalah benar.`,
                actionButton: "Ya, Hapus",
                cancelButton: "Batalkan",
                actionProps: {
                  variant: "lakoePrimary",
                  className: "rounded-full",
                },
                cancelProps: { variant: "outline", className: "rounded-full" },
              });
            }}
          >
            <BiTrash className="mr-2" /> <span>Hapus Produk</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
