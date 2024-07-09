import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFormProps {
  label?: string;
  placeholder: string;
  startAdornment?: string;
  endAdornment?: string;
  className?: string;
}

export function InputForm({
  label,
  placeholder,
  startAdornment,
  endAdornment,
  className,
  ...props
}: InputFormProps) {
  return (
    <>
      <div className="m-3">
        <Label>{label}</Label>
        <Input
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
