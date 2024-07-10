// TODO
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { ButtonPrimary } from "../button/btn-primary";
import { Variant } from "@/types/variant";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "../ui/button";

type ProductDialogActivationProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: (isSuccess: boolean) => void;
  variants: Variant[] | undefined;
  productName: string | undefined;
};

export default function ProductDialogActivation({
  isOpen,
  onOpen,
  productName,
  onConfirm,
  variants,
}: ProductDialogActivationProps) {
  const { toast } = useToast();

  const form = useForm({
    values: {
      variant: variants,
    },
    resolver: zodResolver(
      z.array(
        z.object({
          stock: z.number().min(1, "Stock tidak boleh kosong."),
          price: z.number().min(1000, "Harga minimal Rp. 1000.00"),
        })
      )
    ),
  });

  const { reset } = form;
  const { isSubmitSuccessful, errors } = form.formState;

  console.log(JSON.stringify(errors), "ERR");

  const { fields } = useFieldArray({
    control: form.control,
    name: "variant",
  });

  console.log(form.watch("variant"), "VARIANT");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleCancel = () => {
    reset();
    onOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      if (onConfirm) onConfirm(true);
      toast({
        description: "Produk berhasil diaktifkan!",
        className: "bg-zinc-950 text-white py-4",
      });
      onOpen(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          onOpen(open);
        }}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Aktifkan Produk</DialogTitle>
            <DialogDescription>
              Pastikan stok tersedia untuk mengaktifkan produk.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="activation_form">
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    name={`variant.${index}`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem key={value.name}>
                        <FormLabel>{productName}</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 w-full">
                            <div className="grid grid-cols-1 gap-2">
                              <Input
                                onChange={(e) => {
                                  onChange({
                                    ...value,
                                    price: Number(e.target.value),
                                  });
                                }}
                                type="number"
                                label="Harga"
                                startAdornment="Rp."
                                value={value.price}
                                placeholder="Masukan Harga"
                                {...field}
                              />
                              <p className="text-sm text-destructive">
                                {errors?.price?.message}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <Input
                                type="number"
                                onChange={(e) => {
                                  onChange({
                                    ...value,
                                    stock: Number(e.target.value),
                                  });
                                }}
                                label="Stok Produk"
                                value={value.stock}
                                placeholder="Masukan Stok"
                                {...field}
                              />
                              <p className="text-sm text-destructive">
                                {errors?.stock?.message}
                              </p>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          </div>
          <DialogFooter>
            <Button
              className="rounded-full"
              variant="outline"
              onClick={handleCancel}
            >
              Batalkan
            </Button>
            <ButtonPrimary
              type="submit"
              className="rounded-full"
              form="activation_form"
            >
              Save changes
            </ButtonPrimary>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
