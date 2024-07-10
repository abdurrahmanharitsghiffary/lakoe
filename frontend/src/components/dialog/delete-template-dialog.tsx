import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Props } from "./add-location-dialog";

export function DeleteTemplateDialog({ isOpen, onOpen }: Props) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Template Pesan </DialogTitle>
          </DialogHeader>
          <p>
            Apakah kamu yakin akan menghapus template pesan ini? Sebab kamu
            tidak dapat mengembalikan template pesan yang sudah dihapus{" "}
          </p>
          <DialogFooter>
            <Button className="bg-white text-black rounded-full border hover:bg-black hover:text-white">
              Batalkan
            </Button>
            <Button className="bg-blue-500 rounded-full">Ya, Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
