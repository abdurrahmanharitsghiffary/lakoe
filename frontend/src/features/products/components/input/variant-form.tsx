import { ShadcnControlled } from "@/components/input/shadcn-controlled";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { variantSchema, VariantSchema } from "../../validator/variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MultipleSelector, Option } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BiTrash } from "react-icons/bi";

const OPTIONS: Option[] = [
  { label: "Red", value: "red" },
  { label: "Toscaa", value: "tosca" },
  { label: "Teal", value: "teal" },
  { label: "Black", value: "black" },
];

export function VariantForms() {
  const [options, setOptions] = useState<Option[]>([]);

  const form = useForm<{ variants: VariantSchema[] }>({
    defaultValues: {
      variants: [
        {
          isActive: false,
          name: "Sage",
          price: 10000,
          stock: 10,
          weightInGram: 5,
        },
      ],
    },
    resolver: zodResolver(z.object({ variants: z.array(variantSchema) })),
  });

  const variants = form.watch("variants");

  console.log(JSON.stringify(form.watch("variants")));

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const handleOptionsChange = (options: Option[]) => {
    console.log(options, "");
    if (options) {
      const lastOption = (Array.from(options) ?? []).slice(-1);
      console.log(lastOption, "LAST OPTIONS");
      if (lastOption && lastOption?.[0]?.label) {
        append({
          isActive: false,
          name: lastOption?.[0]?.label ?? "",
          price: 0,
          stock: 0,
          weightInGram: 0,
        });
      }
    }
    setOptions(options);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <MultipleSelector
          value={options}
          onChange={handleOptionsChange}
          badgeClassName={cn(badgeVariants({ variant: "secondary" }))}
          placeholder="Select variants"
          defaultOptions={OPTIONS}
          creatable
        />

        {fields.map((field, i) => (
          <div key={field?.id} className="flex flex-col">
            <div className="font-semibold text-xl flex gap-4 items-center text-center justify-between">
              <h2 className="capitalize">{variants?.[i]?.name}</h2>
              <div className="flex gap-4 items-center">
                <Switch {...form.register(`variants.${i}.isActive`)} />
                <Button
                  type="button"
                  onClick={() => remove(i)}
                  variant="outline"
                  size="icon"
                >
                  <BiTrash size={18} />
                </Button>
              </div>
            </div>
            <div className="flex justify-start gap-2 w-full mb-2">
              <ShadcnControlled
                label="Name"
                control={form.control}
                name={`variants.${i}.name`}
              />
              <ShadcnControlled
                type="number"
                label="Stock"
                startAdornment="Rp."
                control={form.control}
                name={`variants.${i}.stock`}
              />
            </div>
            <div className="flex justify-start gap-2">
              <ShadcnControlled
                type="number"
                label="Price"
                control={form.control}
                name={`variants.${i}.price`}
              />
              <ShadcnControlled
                type="number"
                label="Weight"
                endAdornment="gram"
                control={form.control}
                name={`variants.${i}.weightInGram`}
              />
            </div>
          </div>
        ))}
      </form>
    </Form>
  );
}
