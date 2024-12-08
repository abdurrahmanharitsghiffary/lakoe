import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  inputVariantProps,
  labelVariantProps,
} from "@/features/products/components/input/input-form";

export const ShadcnControlled = <T extends FieldValues>({
  control,
  name,
  isRequired,
  description,
  className,
  label,
  ...props
}: {
  control: Control<T>;
  name: Path<T>;
  isRequired?: boolean;
  description?: string;
  label?: string;
} & InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <div className="flex flex-col justify-start gap-2">
            {label && (
              <FormLabel className={cn(labelVariantProps({ isRequired }))}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Input
                className={cn(
                  inputVariantProps({ focus: "lakoePrimary" }),
                  className
                )}
                {...props}
                {...field}
                onChange={(e) => {
                  if (props.type === "number")
                    return onChange(Number(e.target.value));
                  onChange(e.target.value);
                }}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
