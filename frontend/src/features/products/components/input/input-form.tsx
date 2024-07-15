import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface InputFormProps
  extends InputProps,
    VariantProps<typeof inputVariantProps>,
    React.RefAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  startAdornment?: string;
  endAdornment?: string;
  className?: string;
  isRequired?: boolean;
}

const labelVariantProps = cva("relative", {
  variants: {
    isRequired: {
      true: "after:content-['*'] after:text-destructive after:text-md after:ms-1",
      false: "",
    },
  },
  defaultVariants: {
    isRequired: false,
  },
});

export const inputVariantProps = cva("", {
  variants: {
    focus: {
      lakoePrimary:
        "has-[:focus]:ring-lakoe-primary has-[:focus]:ring-2 focus:ring-offset-2 focus:outline-none focus:rounded-md",
    },
  },
});

export function InputForm({
  label,
  placeholder,
  startAdornment,
  endAdornment,
  className,
  isRequired,
  focus,
  ...props
}: InputFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={labelVariantProps({ isRequired })}>{label}</Label>
        <Input
          className={cn(inputVariantProps({ focus }), className)}
          placeholder={placeholder}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          {...props}
        />
      </div>
    </>
  );
}
