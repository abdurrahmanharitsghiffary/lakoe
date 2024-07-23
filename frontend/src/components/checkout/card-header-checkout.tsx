import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CheckoutDialogLogin } from "../dialog/checkout-dialog-login";
import { useFormContext } from "react-hook-form";
import { FormCheckout } from "@/validator/checkout-validator";
import { useState } from "react";

interface CardHeaderProps {
  onInputChange: (name: keyof FormCheckout, value: string) => void;
  formData: FormCheckout;
}
export function CardHeaderCheckout({ onInputChange, formData }: CardHeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { register, formState: { errors } } = useFormContext<FormCheckout>();

  return (
    <div className="flex w-full mt-4">
      <Card className="flex w-full h-auto py-4">
        <div className="flex flex-col px-4">
          <h1 className="text-2xl font-bold mx-3"> Informasi kontak</h1>
          <div className="flex w-full ">
            <div className="flex flex-col w-full mt-5">
              <>
                <Label
                  htmlFor="recipientName"
                  className="text-lg px-4 mt-5"
                >
                  Nama kontak
                </Label>
                <Input
                  id="recipientName"
                  placeholder="Masukkan Nama Anda"
                  {...register("recipientName")}
                  type="text"
                  value={formData.recipientName}
                  className="text-lg h-12 mb-[-10px] mx-3 w-[600px]"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 50) {
                      onInputChange('recipientName', value);
                    }
                  }}
                />
                <Label className="text-lg text-right mr-[90px] mt-[10px] font-light">
                  {formData.recipientName.length}/50
                </Label>

                {errors.recipientName &&
                  <p className="ml-4 text-red-500 mt-[-10px]">{errors.recipientName.message}</p>}

              </>
              <>
                <Label
                  htmlFor="telephone"
                  className="flex flex-row text-lg px-3 mt-[30px] mb-[-10px] justify-between"
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
                  type="text"
                  value={formData.telephone}
                  onChange={(e) => onInputChange('telephone', e.target.value)}
                />
                <span className="flex mx-3">
                  <p className="mb-[20px]">
                    Kami akan mengirimkan konfirmasi dan informasi perubahan
                    status pesanan ke WhatsApp kamu
                  </p>
                </span>

                {errors.telephone && <p className="ml-4 text-red-500 mt-[-10px] mb-3">{errors.telephone.message}</p>}
              </>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
