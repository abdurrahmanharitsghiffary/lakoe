import { useConfirm } from "@/providers/alert-dialog-provider";

export const useConfirmNonactiveProduct = () => {
  const confirm = useConfirm();
  return (productCount: number) =>
    confirm({
      title: `Nonaktifkan ${productCount} Produk`,
      body: "Produk yang dinonaktifkan tidak akan dapat dilihat oleh calon pembeli. pastikan tindakan kamu benar.",
      actionButton: "Ya, Nonaktifkan",
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
