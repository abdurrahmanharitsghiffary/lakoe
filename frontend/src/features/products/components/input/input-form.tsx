import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

interface InputFormProps
  extends InputProps,
    React.RefAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  startAdornment?: string;
  endAdornment?: string;
  className?: string;
  isRequired?: boolean;
}

const inputFormVariants = cva("relative", {
  variants: {
    isRequired: {
      true: "after:content-['*'] after:text-destructive after:absolute after:-right-3 after:text-md after:-bottom-2 after:text-xl",
      false: "",
    },
  },
  defaultVariants: {
    isRequired: false,
  },
});

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      label,
      placeholder,
      startAdornment,
      endAdornment,
      className,
      isRequired,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="m-3">
          <Label className={inputFormVariants({ isRequired })}>{label}</Label>
          <Input
            ref={ref}
            placeholder={placeholder}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
            className={className}
            {...props}
          />
        </div>
      </>
    );
  }
);

export { InputForm };
