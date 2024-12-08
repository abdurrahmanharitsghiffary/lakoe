import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/providers/alert-dialog-provider";
import { Product } from "@/types/product";
import { BiTrash } from "react-icons/bi";
import { useDeleteProduct } from "@/features/products/api/delete-product";

type Props = {
  product: Product | undefined;
};

export function ProductMenu({ product }: Props) {
  const { deleteProductAsync } = useDeleteProduct();
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
          {/* <DropdownMenuItem>
            <BiEdit className="mr-2" /> <span>Edit Produk</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={async () => {
              if (!product?.id) return;
              const isConfirmed = await confirm({
                title: `Hapus Produk ${product?.name}?`,
                body: `Produk ${product?.name} akan dihapus. \n
Produk yang dihapus tidak akan dibatalkan. Pastikan produk yang kamu pilih itu adalah benar.`,
                actionButton: "Ya, Hapus",
                cancelButton: "Batalkan",
                actionProps: {
                  variant: "lakoePrimary",
                  className: "rounded-full",
                },
                cancelProps: { variant: "outline", className: "rounded-full" },
              });
              if (isConfirmed) await deleteProductAsync(product?.id);
            }}
          >
            <BiTrash className="mr-2" /> <span>Hapus Produk</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
