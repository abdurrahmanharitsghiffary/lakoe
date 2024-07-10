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
import { Textarea } from "../ui/textarea";
import { Props } from "./add-location-dialog";

export function AddTemplateDialog({ isOpen, onOpen }: Props) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Template Pesan Baru</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Judul Pesan</Label>
            <Input placeholder="Cth. Pesan Konfirmasi Pengiriman" />
          </div>
          <div>
            <Label>Detail Isi Pesan</Label>
            <div className="flex gap-2 mb-2">
              <Button className="bg-white text-black border hover:bg-black hover:text-white rounded-full">
                Nama Pembeli
              </Button>
              <Button className="bg-white text-black hover:bg-black hover:text-white border rounded-full">
                Nama Produk
              </Button>
              <Button className="bg-white text-black hover:bg-black hover:text-white border rounded-full">
                Nama Toko
              </Button>
            </div>
            <Textarea
              placeholder="Tuliskan isi pesan disini"
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <Button className="bg-white text-black rounded-full border hover:bg-black hover:text-white">
              Batal
            </Button>
            <Button className="bg-blue-500 rounded-full">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
