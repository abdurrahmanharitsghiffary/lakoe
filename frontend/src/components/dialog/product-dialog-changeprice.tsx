import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { InputForm } from "@/features/products/components/input/input-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePriceSchema } from "@/validator/validator";
import { ChangePriceType } from "@/types/type";
import { Product } from "@/types/product";

type ProductDialogChangePriceProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | undefined;
};

export function ProductDialogChangePrice({
  isOpen,
  onOpen,
  product,
}: ProductDialogChangePriceProps) {
  const form = useForm<ChangePriceType>({
    resolver: zodResolver(changePriceSchema),
    defaultValues: {
      price: product?.variants?.[0]?.price,
    },
  });
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          onOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Harga</DialogTitle>
            <DialogDescription className="flex gap-1">
              Ubah Harga Untuk Produk{" "}
              <p style={{ fontWeight: "bold" }}>{product?.name}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <Form {...form}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputForm
                        placeholder="Masukkan Harga Satuan Barang"
                        {...field}
                        startAdornment="Rp."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                onOpen(false);
              }}
              className=" rounded-full"
              variant="outline"
            >
              Batalkan
            </Button>
            <Button
              type="submit"
              onClick={() => {
                onOpen(false);
              }}
              variant="lakoePrimary"
              className="rounded-full"
              //   onClick={handleSubmit((data) => {
              //     onSubmit(data)
              //   })}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
