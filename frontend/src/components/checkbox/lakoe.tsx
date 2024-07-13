import { Checkbox, CheckboxProps } from "./checkbox";

export function LakoeCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      className="border-lakoe-primary data-[state=checked]:bg-lakoe-primary data-[state=checked]:text-white"
      {...props}
    />
  );
}
