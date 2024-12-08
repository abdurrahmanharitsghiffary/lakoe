import { useConfirm } from "@/providers/alert-dialog-provider";

export const useConfirmDeleteProduct = () => {
  const confirm = useConfirm();
  return (productCount: number) =>
    confirm({
      title: `Hapus ${productCount} Produk`,
      body: "Produk yang dihapus tidak akan bisa dibatalkan, Pastikan produk yang kamu pilih sudah benar.",
      actionButton: "Ya, Hapus",
      cancelButton: "Batalkan",
      actionProps: {
        className: "bg-lakoe-primary rounded-full hover:bg-lakoe-secondary",
      },
      cancelProps: {
        variant: "outline",
        className: "rounded-full",
      },
    });
};
