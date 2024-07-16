import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectProps {
  label?: string;
  placeHolder: string;
  options: { value: string; name: string }[];
  //   onChange: (value: string) => void;
}
export function SelectInput({ label, placeHolder, options }: SelectProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}