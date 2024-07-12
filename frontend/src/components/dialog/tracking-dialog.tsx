import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { ButtonCopy } from "../button/copy";
import { BsCopy } from "react-icons/bs";
import { Card } from "../ui/card";

type TrackingDialogProps = {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
};

export function TrackingDialog({ isOpen, onOpen }: TrackingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent className="text-sm">
        <DialogHeader>
          <DialogTitle>Lacak Pengiriman</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 basis-1/2">
            <div className="flex flex-col gap-1">
              <p>Kurir</p>
              <p className="font-semibold">J&T Regular</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>
                No Resi{" "}
                <ButtonCopy
                  text="COPIED INVOICE..."
                  className="w-6 h-6"
                  size="icon"
                  variant="ghost"
                >
                  <BsCopy />
                </ButtonCopy>
              </p>
              <p className="font-semibold">J&T Regular</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Pengirim</p>
              <p className="font-semibold">Jamal Integer</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 basis-1/2">
            <div className="flex flex-col gap-1">
              <p>Penerima</p>
              <p className="font-semibold">Jamal Boolean</p>
              <p>
                RT.08 / RW.07, No. 174, Jln. Haji Mawi, Desa Waru Jaya, Parung,
                Bogor
              </p>
            </div>
          </div>
        </div>
        <p>
          Status: <span className="font-semibold">Dalam Proses Pengiriman</span>
        </p>
        <Card>
          <section className="p-4">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="mb-4 ms-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-lakoe-primary rounded-full -start-2 border-[var(--lakoe-primary-100)] border-2 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"></span>
                <h3 className="font-medium leading-tight text-black">
                  Pesanan dibuat
                </h3>
                <p className="text-sm">Sab, 10 Agu 2023 - 14:00 WIB</p>
              </li>
              <li className="ms-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 border-gray-100 border-2 dark:bg-gray-700"></span>
                <h3 className="font-medium leading-tight text-black">
                  Pesanan dibuat
                </h3>
                <p className="text-sm">Sab, 10 Agu 2023 - 14:00 WIB</p>
              </li>
            </ol>
          </section>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
