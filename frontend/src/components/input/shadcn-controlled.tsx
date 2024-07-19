import React from "react";
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

export const ShadcnControlled = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  ...props
}: {
  control: Control<T>;
  name: Path<T>;
  description?: string;
  label?: string;
} & InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
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
        </FormItem>
      )}
    />
  );
};
