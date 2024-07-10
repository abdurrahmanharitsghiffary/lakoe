import { ButtonPrimary } from "../button/btn-primary";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
export type Props = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function AddLocationDialog({ isOpen, onOpen }: Props) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Lokasi</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Nama Lokasi</Label>
            <Input placeholder="Cth. Toko Amanda" />
          </div>
          <div>
            <Label>Kota/Kecamatan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Cari Kota/Kecamatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="depok">Bekasi</SelectItem>
                <SelectItem value="bekasi">Bekasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kode Pos</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Masukkan 5 digit kode pos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">154123</SelectItem>
                <SelectItem value="depok">19087</SelectItem>
                <SelectItem value="bekasi">12645</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <ButtonPrimary className="rounded-full">Simpan</ButtonPrimary>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
