import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

type ProductDialogActivationProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: (isSuccess: boolean) => void;
};

export default function ProductDialogActivation({
  isOpen,
  onOpen,
  onConfirm,
}: ProductDialogActivationProps) {
  const { control } = useForm({
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
            <DialogTitle>Aktifkan Produk</DialogTitle>
            <DialogDescription>
              Pastikan stok tersedia untuk mengaktifkan produk.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* {fields.map((field, index) => (
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
            ))} */}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (onConfirm) onConfirm(true);
                onOpen(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
