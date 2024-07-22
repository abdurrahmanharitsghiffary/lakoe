import { useAddCheckout } from "@/hooks/use-add-checkout";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { CheckoutDialogLogin } from "../dialog/checkout-dialog-login";

export function CardHeaderCheckout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { register, errors } = useAddCheckout();
  const inputRef = useRef<HTMLInputElement>(null);
  const [Input1, setInput] = useState<number | null>(
    inputRef.current?.value.length || 0
  );
  return (
    <div className="flex w-full mt-4">
      <Card className="flex w-full h-auto py-4">
        <div className="flex flex-col px-4">
          <h1 className="text-2xl font-bold mx-3"> Informasi kontak</h1>
          <div className="flex w-100 ">
            <div className="flex flex-col w-full mt-5">
              <form>
                <>
                  <Label
                    htmlFor="recipientName"
                    className="text-lg px-4 mt-5 mb-[-10px]"
                  >
                    Nama kontak
                  </Label>
                  <Input
                    id="recipientName"
                    placeholder="Masukkan Nama Anda"
                    {...register("recipientName")}
                    ref={inputRef}
                    className="text-lg h-12 mb-[-10px] mx-3 w-[600px]"
                    onChange={(e) => setInput(e.target.value.length)}
                    maxLength={50}
                  />
                  <Label className="text-lg float-right mr-[90px] mt-[10px]">
                    {Input1}/50
                  </Label>
                  {errors.recipientName && (
                    <p>{errors.recipientName.message}</p>
                  )}
                </>
                <>
                  <Label
                    htmlFor="telephone"
                    className="flex flex-row text-lg px-3 mt-[50px] mb-[-10px] justify-between"
                  >
                    <p>Nomor Whatsapp</p>
                    <a
                      className="text-blue-500 cursor-pointer mr-[80px]"
                      onClick={() => setIsLoginOpen(true)}
                    >
                      Login
                    </a>
                    <CheckoutDialogLogin
                      onOpen={setIsLoginOpen}
                      isOpen={isLoginOpen}
                    />
                  </Label>

                  <Input
                    id="telephone"
                    className="text-lg h-12 mx-3 w-[600px] mt-3"
                    placeholder="Masukkan No Telp yang Valid"
                    startAdornment="+62"
                    {...register("telephone")}
                  />
                  <span className="flex mx-3">
                    <p className="mb-[20px]">
                      Kami akan mengirimkan konfirmasi dan informasi perubahan
                      status pesanan ke WhatsApp kamu
                    </p>
                  </span>
                  {errors.telephone && <p>{errors.telephone.message}</p>}
                </>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
