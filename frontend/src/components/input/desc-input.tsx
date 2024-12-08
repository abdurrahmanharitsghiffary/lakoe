import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";
import { inputVariantProps } from "@/features/products/components/input/input-form";

interface DescProps
  extends VariantProps<typeof inputVariantProps>,
    TextareaProps,
    React.RefAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const descVariantProps = cva("", {
  variants: {
    isRequired: {
      true: "after:content-['*'] after:text-destructive after:text-md after:ms-1",
      false: "",
    },
  },
});

const DescInput = forwardRef<HTMLTextAreaElement, DescProps>(
  ({ isRequired, label, placeholder, ...props }, ref) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <Label className={descVariantProps({ isRequired })}>{label}</Label>
          <Textarea
            ref={ref}
            placeholder={placeholder}
            className="resize-none h-32"
            {...props}
          />
        </div>
      </>
    );
  }
);

DescInput.displayName = "DescInput";

export { DescInput };
