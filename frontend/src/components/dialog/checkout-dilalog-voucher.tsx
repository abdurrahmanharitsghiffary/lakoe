import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type CheckOutDialogVoucherProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckoutDialogVoucher({
  isOpen,
  onOpen,
}: CheckOutDialogVoucherProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpen(open);
      }}
    >
      <DialogContent className="flex-col sm:max-w-[600px] h-[700px] px-10">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-2xl w-full">
            Pilih Diskon Voucher
          </DialogTitle>
          <div className="border-b-2 w-full"></div>
          <DialogDescription className="flex w-100 text-lg gap-4">
            <Input placeholder="Masukkan kode voucher" type="text" className="py-6 w-[398px] text-lg" />
            <Button className="bg-lakoe-primary py-6">
              <p className="text-lg">Terapkan</p>
            </Button>
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full mt-[-270px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl">Pilih Voucher Yang Tersedia</AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl">Voucher Yang tidak tersedia</AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
