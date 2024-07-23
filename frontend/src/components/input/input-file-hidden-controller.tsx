import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";

export type InputFileHiddenControlledProps<T extends FieldValues> = {
  onFileChange?: (file: File) => void;
  divProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  children?: React.ReactNode;
} & UseControllerProps<T> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export function InputFileHiddenControlled<T extends FieldValues>({
  divProps,
  children,
  onFileChange,
  ...props
}: InputFileHiddenControlledProps<T>) {
  const { className, ...divP } = divProps || {};

  const {
    field: { onChange, ...field },
  } = useController(props);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props?.multiple) onChange(Array.from(e?.target?.files ?? []));
    const file = e?.target?.files?.[0];
    if (file) {
      onChange(file);
      if (onFileChange) onFileChange(file);
    }
    e.target.value = "";
  };

  return (
    <div {...divP} className={cn("relative", className)}>
      <input
        {...props}
        {...field}
        value={undefined}
        onChange={handleFileChange}
        className={cn("opacity-0 inset-0 absolute", props?.className)}
        type="file"
      />
      {children}
    </div>
  );
}
