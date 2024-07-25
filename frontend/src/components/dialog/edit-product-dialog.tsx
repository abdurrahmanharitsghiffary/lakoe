import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Product } from "@/types/product";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProductSchema,
  UpdateProductSchema,
  useUpdateProduct,
} from "@/features/products/api/update-product";
import { useConfirm } from "@/providers/alert-dialog-provider";
import { toast } from "react-toastify";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";

export function EditProductDialog({
  isOpen,
  onOpen,
  product,
}: {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | undefined;
}) {
  const { updateProductAsync } = useUpdateProduct();
  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    values: {
      description: product?.description,
      name: product?.name,
      minimumOrder: product?.minimumOrder,
    },
  });
  const confirm = useConfirm();
  const { handleSubmit, control } = form;

  const handleCancel = () => {};

  const onSubmit: SubmitHandler<UpdateProductSchema> = async (data) => {
    const confirmed = await confirm({
      body: "Simpan perubahan pada produk?",
      title: "Edit Produk",
    });

    if (confirmed && product?.id) {
      toast.promise(
        updateProductAsync({ ...data, productId: product?.id })
          .then((res) => res.data.data)
          .catch((err) => Promise.reject(err)),
        {
          success: {
            render() {
              onOpen(false);
              return "Produk berhasil diupdate.";
            },
          },
          error: {
            render({ data }) {
              return getAxiosErrMessage(data);
            },
          },
          pending: "Menyimpan perubahan...",
        }
      );
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Produk {product?.name}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="edit_produk_form"
              className="grid gap-4 py-4"
            >
              <FormField
                name="name"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Nama Produk
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        <Input placeholder="Nama Produkmu" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Deskripsi Produk
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        <Textarea
                          placeholder="Deskripsikan Produkmu"
                          className="resize-none"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="minimumOrder"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Minimal Pembelian
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        <Input
                          type="number"
                          onChange={(e) => onChange(+e.target.value)}
                          placeholder="Minimal Pembelian"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              className="rounded-full"
              variant="outline"
              onClick={handleCancel}
            >
              Batalkan
            </Button>
            <Button
              variant="lakoePrimary"
              type="submit"
              className="rounded-full"
              form="edit_produk_form"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
