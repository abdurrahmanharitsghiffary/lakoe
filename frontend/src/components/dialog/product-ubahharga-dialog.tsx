import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
// import {
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//   } from "@/components/ui/form";
//   import { Input } from "@/components/ui/input";
  import { useFieldArray, useForm } from "react-hook-form";

type ProductDialogChangePriceProps = {
    isOpen: boolean;
    onOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm?: (isSuccess: boolean) => void;
  };

export default function ProductDialogChangePrice({
    isOpen,
    onOpen,
    onConfirm,
  }: ProductDialogChangePriceProps) {
    const { control, register } = useForm({
      defaultValues: {
        variant: [
          { name: "XL", price: 40827, stock: 20 },
          { name: "LG", price: 78827, stock: 20 },
        ],
      },
    });
    const { fields } = useFieldArray({
      control,
      name: "variant",
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
                <DialogDescription>
                  Ubah Harga Untuk Produk
                </DialogDescription>
              </DialogHeader>
              {/* <div className="grid gap-4 py-4">
                {fields.map((field, index) => (
                  <FormField
                    control={control}
                    name={`variant.${index}`}
                    render={({ field }) => (
                      <FormItem key={field.value.name}>
                        <FormLabel>{field.value.name}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div> */}
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    if (onConfirm) onConfirm(true);
                    onOpen(false);
                  }}
                >
                    Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    if (onConfirm) onConfirm(true);
                    onOpen(false);
                  }}
                >
                    Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    }