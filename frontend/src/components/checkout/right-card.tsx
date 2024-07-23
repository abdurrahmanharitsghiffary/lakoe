import { Button } from "../ui/button";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSolidDiscount } from "react-icons/bi";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { CheckoutDialogVoucher } from "../dialog/checkout-dilalog-voucher";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormCheckout } from "@/validator/checkout-validator";

interface RightCardProps {
  onInputChange: (name: keyof FormCheckout, value: string) => void;
  formData: FormCheckout;
}

export function RightCard({onInputChange,formData}:RightCardProps) {
  const { register, formState:{errors}} = useFormContext<FormCheckout>();
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  return (
    <div className="flex flex-col w-[450px] mr-[200px]">
      <Button
        variant={"outline"}
        className="border-black  mx-3 flex flex-row w-full justify-between py-8 rounded-xl"
        onClick={() => setIsVoucherOpen(true)}
      >
        <div className="flex flex-row w-100 ">
          <div className="flex flex-row w-full items-center gap-2">
            <BiSolidDiscount className="h-6 w-6" color="blue" />
            <p className="text-lg">Gunakan / Masukkan Voucher</p>
          </div>
        </div>
        <div className="flex flex-row py-3 items-center">
          <TiArrowSortedDown />
        </div>
      </Button>
      <CheckoutDialogVoucher onOpen={setIsVoucherOpen} isOpen={isVoucherOpen} />
      <Card className="flex w-full mt-5 mx-3 bg-blue-100 border-blue-500">
        <div className="flex flex-col w-full mx-10 py-8 ">
          <h1 className="text-2xl font-bold">Ringkasan Pesanan</h1>
          <div className="flex flex-row mt-[30px]">
            <img
              src="assets/sepatuputih.jpeg"
              alt="sepatu putih"
              className="h-[60px] w-[60px] rounded-[8px]"
            />
            <div className="flex flex-col px-4 mt-[-10px]">
              <span className="font-bold">Sepatu Mantap</span>
              <span className="text-gray-400">1 item (123g)</span>
              <span>Rp. 50000</span>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between mt-8">
            <p className="text-xl font-bold text-gray-400">Total Harga</p>
            <p className="text-xl ">Rp. 50000</p>
          </div>
          <div className="flex flex-row justify-between mt-2 ">
            <div className="text-xl font-bold text-gray-400">
              Biaya Pengiriman
            </div>
            <div className="text-xl ">Rp. 9000</div>
          </div>
          <span className="border-solid border-t-2 border-gray-400 mt-5"></span>
          <div className="flex flex-row justify-between mt-2">
            <div className="text-xl font-bold text-gray-400">
              Total Pembayaran
            </div>
            <div className="text-xl">Rp. 59000</div>
          </div>
        </div>
      </Card>
      <Card className="flex w-full mt-5 mx-3">
        <div className="flex flex-col w-full mx-10 py-8 ">
          <div className="flex flex-row w-full gap-1">
            <h1 className="text-2xl font-bold">Catatan</h1>
            <h1 className="text-2xl font-bold text-gray-400">(Pilihan)</h1>
          </div>
          <div className="flex flex-col w-full mt-8 float-right">
            <Textarea
              id="note"
              {...register("note")}
              value={formData.note}
              placeholder="Tuliskan Catatan di sini"
              className="text-lg h-12"
              onChange={(e) =>  {const value = e.target.value;
                if (value.length <= 50) {
                  onInputChange('note', value);
                }
              }}
            />
            {errors.note && <p>{errors.note.message}</p>}
            <div className="flex w-full justify-end">
              <span className="text-lg">{formData.note.length}/150</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
