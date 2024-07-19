import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { PiExclamationMarkDuotone } from "react-icons/pi";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { MapLeaflet } from "../map/leaflet";
  
  type CheckOutDialogPinpointProps = {
    isOpen: boolean;
    onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  export function CheckoutDialogPinpoint({
    isOpen,
    onOpen,
  }: CheckOutDialogPinpointProps) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          onOpen(open);
        }}
      >
        <DialogContent className="flex-col sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center text-2xl w-full">
              Ubah Pinpoint
            </DialogTitle>
            <div className="border-b-2 w-full"></div>
            <DialogDescription className="flex w-100 text-lg">
              <Card className="flex flex-row w-full h-auto my-5 bg-indigo-300 py-3 gap-4 ">
                    <PiExclamationMarkDuotone/>
                    <p className="text-sm">Pastikan Pinpoint lokasi kamu sama dengan alamat yang kamu tulis</p>
              </Card>
            </DialogDescription>
            <div className="mt-5">
                <MapLeaflet/> 
            </div>
           
            
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-row w-full justify-center gap-4 py-3">
                <Button variant={"outline"} className="py-6" >
                    <p className="text-lg">Kembali</p>
                </Button>
                <Button className="bg-lakoe-primary py-6">
                    <p className="text-lg">Pilih Lokasi</p>
                </Button>
            </div>
          </DialogFooter>
        </DialogContent>
     </Dialog>
    )
}   