import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";
import { CheckboxProps as ShadcnCheckboxProps } from "@radix-ui/react-checkbox";

export type CheckboxProps = ShadcnCheckboxProps & { label?: string };

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <div className="items-top flex space-x-2">
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      <ShadcnCheckbox id={id} {...props} />
    </div>
  );
}
