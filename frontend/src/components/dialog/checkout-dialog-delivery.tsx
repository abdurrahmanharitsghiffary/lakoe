import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CheckOutDialogPaymentProps = {
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckoutDialogDelivery({
  isOpen,
  onOpen,
}: CheckOutDialogPaymentProps) {

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
            Metode Pengiriman
          </DialogTitle>
          <div className="border-b-2 w-full"></div>
          <DialogTitle className="text-xl">Besok(2 hari)</DialogTitle>
          <DialogDescription className="flex w-100 text-lg">
            Pembelian Diatas Jam 2 dikirim besok
          </DialogDescription>
        </DialogHeader>
        <RadioGroup defaultValue="antaraja" className="px-5 space-y-4 ">
          <div className="flex items-center w-full space-x-4 ">
            <RadioGroupItem
              value="antaraja"
              id="r1"
              className="h-5 w-5 text-blue-500 border-blue-500"
            />
            <Label
              htmlFor="r1"
              className="flex flex-row w-full my-[-25px] justify-between"
            >
              <div className="flex flex-row">
                <img
                  src="/assets/anteraja.svg"
                  alt="anteraja icon"
                  className="h-[110px]"
                />
                <p className="text-lg mt-[40px] mx-[15px]">Antar Aja</p>
              </div>
              <div className="flex flex-row  ">
                <p className="text-xl mt-[40px] text-blue-500">Rp.50000</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center w-full py-4 space-x-4 ">
            <RadioGroupItem
              value="jnee"
              id="r2"
              className="h-5 w-5 text-blue-500 border-blue-500"
            />
            <Label
              htmlFor="r2"
              className="flex flex-row w-full my-[-220px] justify-between"
            >
              <div className="flex flex-row">
                <img
                  src="/assets/jneexpress.svg"
                  alt="anteraja icon"
                  className="h-[130px] mt-[10px] ml-[-10px] object-cover"
                />
                <p className="text-lg mt-[60px] ml-[25px]">JNE express</p>
              </div>
              <div className="flex flex-row  ">
                <p className="text-xl mt-[60px] text-blue-500">Rp.50000</p>
              </div>
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-xl">Besok(2 hari)</DialogTitle>
            <DialogDescription className="flex w-100 text-lg">
              Pembelian Diatas Jam 3 dikirim besok
            </DialogDescription>
            <div className="flex flex-col space-y-4">

            <div className="flex items-center w-full space-x-4">
              <RadioGroupItem
                value="antaraja2"
                id="r3"
                className="h-5 w-5 text-blue-500 border-blue-500"
              />
              <Label
                htmlFor="r3"
                className="flex flex-row w-full my-[-25px] justify-between"
              >
                <div className="flex flex-row">
                  <img
                    src="/assets/anteraja.svg"
                    alt="anteraja icon"
                    className="h-[110px]"
                  />
                  <p className="text-lg mt-[40px] mx-[15px]">Antar Aja</p>
                </div>
                <div className="flex flex-row  ">
                  <p className="text-xl mt-[40px] text-blue-500">Rp.50000</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center w-full py-2 mt-[-20x] space-x-4">
              <RadioGroupItem
                value="jne"
                id="r4"
                className="h-5 w-5 text-blue-500 border-blue-500"
              />
              <Label
                htmlFor="r4"
                className="flex flex-row w-full my-[-220px] justify-between"
              >
                <div className="flex flex-row">
                  <img
                    src="/assets/jneexpress.svg"
                    alt="jne icon"
                    className="h-[130px] mt-[10px] ml-[-10px] object-cover"
                  />
                  <p className="text-lg mt-[60px] ml-[25px]">JNE express</p>
                </div>
                <div className="flex flex-row  ">
                  <p className="text-xl mt-[60px] text-blue-500">Rp.50000</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center w-full space-x-4 py-6 ">
              <RadioGroupItem
                value="jnt"
                id="r5"
                className="h-5 w-5 text-blue-500 border-blue-500"
              />
              <Label
                htmlFor="r5"
                className="flex flex-row w-full my-[-220px] justify-between"
              >
                <div className="flex flex-row">
                  <img
                    src="/assets/jnt.svg"
                    alt="jnt icon"
                    className="h-[150px] mt-[2px] ml-[-5px] object-cover"
                  />
                  <p className="text-lg mt-[60px] ml-[20px]">J&T EZ</p>
                </div>
                <div className="flex flex-row  ">
                  <p className="text-xl mt-[60px] text-blue-500">Rp.50000</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center w-full py-2  space-x-4">
              <RadioGroupItem
                value="tiki"
                id="r6"
                className="h-5 w-5 text-blue-500 border-blue-500"
              />
              <Label
                htmlFor="r6"
                className="flex flex-row w-full my-[-220px] justify-between"
              >
                <div className="flex flex-row">
                  <img
                    src="/assets/tiki.svg"
                    alt="tiki icon"
                    className="h-[150px] ml-[-5px] object-cover"
                  />
                  <p className="text-lg mt-[60px] ml-[25px]">Tiki</p>
                </div>
                <div className="flex flex-row  ">
                  <p className="text-xl mt-[60px] text-blue-500">Rp.50000</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center w-full py-4  space-x-4">
              <RadioGroupItem
                value="ninjaexpress"
                id="r7"
                className="h-5 w-5 text-blue-500 border-blue-500"
              />
              <Label
                htmlFor="r7"
                className="flex flex-row w-full my-[-220px] justify-between"
              >
                <div className="flex flex-row">
                  <img
                    src="/assets/ninjaexpress.svg"
                    alt="ninjaexpress icon"
                    className="h-[150px] mt-[10px] ml-[-5px] object-cover"
                  />
                  <p className="text-lg mt-[70px] ml-[25px]">Ninja Express</p>
                </div>
                <div className="flex flex-row  ">
                  <p className="text-xl mt-[70px] text-blue-500">Rp.50000</p>
                </div>
              </Label>
            </div>
            </div>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
