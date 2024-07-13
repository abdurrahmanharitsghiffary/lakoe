import { InputForm } from "@/features/products/components/input/input-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Label } from "../ui/label";

import { Textarea } from "../ui/textarea";
import { SelectInput } from "../input/select-input";
export type Props = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddLocationDialog({ isOpen, onOpen }: Props) {
  const cityOptions = [
    { value: "jakarta", name: "Jakarta" },
    { value: "depok", name: "Depok" },
    { value: "bekasi", name: "Bekasi" },
  ];

  const postOptions = [
    { value: "jakarta", name: "154123" },
    { value: "depok", name: "19087" },
    { value: "bekasi", name: "12645" },
  ];
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

          <SelectInput
            label="Kota/Kecamatan"
            placeHolder="Cari Kota/Kecamatan"
            options={cityOptions}
          />

          <SelectInput
            label="Kode Pos"
            placeHolder="Masukkan 5 digit kode pos"
            options={postOptions}
          />

          <div className="mx-3">
            <Label>Alamat Lengkap</Label>
            <Textarea
              placeholder="Tuliskan alamat lengkap toko"
              className="resize-none"
            />
          </div>
          <div className="mx-3">
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
