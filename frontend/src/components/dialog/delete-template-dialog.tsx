import { ButtonPrimary } from "../button/btn-primary";
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
            <Button variant={"outline"} className=" rounded-full ">
              Batalkan
            </Button>
            <ButtonPrimary className="rounded-full">Ya, Hapus</ButtonPrimary>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
