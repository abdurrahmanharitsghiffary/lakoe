import { DeleteTemplateDialog } from "@/components/dialog/delete-template-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { BiDuplicate, BiEdit, BiTrash } from "react-icons/bi";

type Props = {
  product: Product | undefined;
};

export default function ProductMenu({ product }: Props) {
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
          <DropdownMenuItem>
            <BiTrash className="mr-2" /> <span>Hapus Produk</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteTemplateDialog />
    </>
  );
}
