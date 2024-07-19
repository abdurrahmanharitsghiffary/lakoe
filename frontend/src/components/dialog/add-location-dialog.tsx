import { InputForm } from "@/features/products/components/input/input-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";

import { Label } from "../ui/label";

import { Textarea } from "../ui/textarea";
import { SelectInput } from "../input/select-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type Props = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddLocationDialog({ isOpen, onOpen }: Props) {
  const postOptions = [
    { value: "jakarta", name: "154123" },
    { value: "depok", name: "19087" },
    { value: "bekasi", name: "12645" },
  ];

  const cities = [
    { value: "jakarta", name: "Jakarta" },
    { value: "depok", name: "Depok" },
    { value: "bekasi", name: "Bekasi" },
  ];

  const [open2, setIsOpen2] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Lokasi</DialogTitle>
          </DialogHeader>

          <InputForm
            label="Nama Lokasi"
            placeholder="Cth. Toko Amanda"
            focus={"lakoePrimary"}
            isRequired
          />

          <Popover open={open2} onOpenChange={setIsOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-full justify-between"
              >
                {value
                  ? cities.find((city) => city.value === value)?.name
                  : "Cari Kota/Kecamatan..."}
                <TiArrowSortedDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setIsOpen2(false);
                      }}
                    >
                      {city.name}
                      <FaCheck
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === city.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <SelectInput
            label="Kode Pos"
            placeHolder="Masukkan 5 digit kode pos"
            options={postOptions}
          />

          <div>
            <Label>Alamat Lengkap</Label>
            <Textarea
              placeholder="Tuliskan alamat lengkap toko"
              className="resize-none"
            />
          </div>
          <div>
            <Label>Pinpoint Lokasi</Label>
            <p className="text-sm text-gray-400">
              Tandain lokasi untuk mempermudah permintaan pickup kurir
            </p>
            <img
              className="w-full h-36"
              src="https://images.unsplash.com/photo-1568317711805-97917847953d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <DialogFooter>
            <Button variant={"outline"} className=" rounded-full ">
              Batal
            </Button>
            <Button variant="lakoePrimary" className="rounded-full">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
