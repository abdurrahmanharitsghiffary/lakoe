import { cva, VariantProps } from "class-variance-authority";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { inputVariantProps } from "@/features/products/components/input/input-form";

interface DescProps extends VariantProps<typeof inputVariantProps> {
  label?: string;
  placeholder: string;
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
export function DescInput({ label, placeholder, isRequired }: DescProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={descVariantProps({ isRequired })}>{label}</Label>
        <Textarea placeholder={placeholder} className="resize-none h-32" />
      </div>
    </>
  );
}
