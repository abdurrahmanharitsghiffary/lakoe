// TODO
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SKU } from "@/types/sku";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import {
  updateSkuSchema,
  useUpdateSku,
} from "@/features/products/api/update-skus";
import { Switch } from "../ui/switch";
import { useConfirm } from "@/providers/alert-dialog-provider";

type ProductDialogActivationProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variants: SKU[] | undefined;
};

const updateSkusSchema = z.object({
  skus: z.array(updateSkuSchema),
});

export function UpdateProductSkuDialog({
  isOpen,
  onOpen,
  variants = [],
}: ProductDialogActivationProps) {
  const confirm = useConfirm();
  console.log(variants, "VAR");
  const form = useForm({
    values: {
      skus: variants.map((v) => ({ ...v, price: Number(v.price) })),
    },
    resolver: zodResolver(updateSkusSchema),
  });
  const { updateSkuAsync } = useUpdateSku();
  const { reset } = form;
  const { errors } = form.formState;

  console.log(JSON.stringify(errors), "ERR");

  const { fields } = useFieldArray({
    control: form.control,
    name: "skus",
  });

  console.log(form.watch("skus"), "VARIANT");

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data, "DATA");
    const confirmed = await confirm({
      body: "Yakin ingin mengedit produk?",
      title: "Edit Produk",
    });
    if (!confirmed || !data) return;
    await Promise.all(
      (data?.skus ?? []).map(
        async (sku: any) => await updateSkuAsync({ ...sku, skuId: sku?.id })
      )
    );
    onOpen(false);
  };

  const handleCancel = () => {
    reset();
    onOpen(false);
  };

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
            <DialogTitle>
              Edit SKU Produk - {variants?.[0]?.product?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="activation_form">
                {fields.map((_field, index) => (
                  <FormField
                    control={form.control}
                    name={`skus.${index}`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem key={value?.sku}>
                        <input type="hidden" value={value?.id} />
                        <FormLabel className="flex justify-between items-center">
                          {value?.product?.name +
                            " " +
                            value?.sku +
                            (value?.skuAttributes?.length > 0
                              ? " - " +
                                value?.skuAttributes
                                  ?.map((attr) => attr.value)
                                  .join(", ")
                              : "")}
                          <Controller
                            control={form.control}
                            name={`skus.${index}.isActive`}
                            render={({ field: { onChange, value } }) => (
                              <Switch
                                className="data-[state=checked]:bg-lakoe-primary"
                                onCheckedChange={onChange}
                                checked={value}
                              />
                            )}
                          />
                        </FormLabel>
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
                                value={Number(value.price)}
                                placeholder="Masukan Harga"
                                {...field}
                              />
                              <p className="text-sm text-destructive">
                                {errors?.skus?.[index]?.price?.message}
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
                                value={Number(value.stock)}
                                placeholder="Masukan Stok"
                                {...field}
                              />
                              <p className="text-sm text-destructive">
                                {errors?.skus?.[index]?.stock?.message}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <Input
                                onChange={(e) => {
                                  onChange({
                                    ...value,
                                    weightInGram: Number(e.target.value),
                                  });
                                }}
                                type="number"
                                label="Berat (gram)"
                                value={Number(value.weightInGram)}
                                placeholder="Masukan Berat"
                                {...field}
                              />
                              <p className="text-sm text-destructive">
                                {errors?.skus?.[index]?.weightInGram?.message}
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
            <Button
              variant="lakoePrimary"
              type="submit"
              className="rounded-full"
              form="activation_form"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
