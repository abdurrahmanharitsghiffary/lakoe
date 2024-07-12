import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const product = {
  name: "Kaos Hitam",
  variant: "Black Sof Kennary",
  size: "S",
};
export function DeleteProduct() {
  const { name, variant, size } = product;
  return (
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
          <AlertDialogDescription>
            Produk{" "}
            <strong>
              {name} - {variant} - {size}
            </strong>{" "}
            akan dihapus?
          </AlertDialogDescription>
          <AlertDialogDescription>
            Produk yang dihapus tidak akan dibatalkan. Pastikan produk yang kamu
            pilih itu adalah benar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction className="bg-lakoe-primary">
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
