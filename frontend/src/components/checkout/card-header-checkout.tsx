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
export function CardHeaderCheckout({
  onInputChange,
  formData,
}: CardHeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<FormCheckout>();

  return (
    <div className="flex w-full mt-4">
      <Card className="flex w-full h-auto py-4">
        <div className="flex flex-col px-4">
          <h1 className="text-2xl font-bold mx-3"> Informasi kontak</h1>
          <div className="flex w-full px-4">
            <div className="flex flex-col w-full mt-5">
              <>
                <Label htmlFor="receiverContactName" className="text-lg mt-5">
                  Nama kontak
                </Label>
                <Input
                  id="receiverContactName"
                  placeholder="Masukkan Nama Anda"
                  {...register("receiverContactName")}
                  type="text"
                  value={formData.receiverContactName}
                  className="text-lg h-12 mb-[-10px]"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 50) {
                      onInputChange("receiverContactName", value);
                    }
                  }}
                />
                <div className="mt-2 flex justify-between">
                  {errors.receiverContactName && (
                    <p className="text-red-500">
                      {errors.receiverContactName.message}
                    </p>
                  )}
                  <Label className="text-lg text-right font-light">
                    {formData.receiverContactName.length}/50
                  </Label>
                </div>
              </>
              <>
                <Label
                  htmlFor="receiverContactPhone"
                  className="flex flex-row text-lg mt-[30px] mb-[-10px] justify-between"
                >
                  <p>Nomor Whatsapp</p>
                  <a
                    className="text-blue-500 cursor-pointer"
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
                  id="receiverContactPhone"
                  className="text-lg h-12 mt-3"
                  placeholder="Masukkan No Telp yang Valid"
                  startAdornment="+62"
                  {...register("receiverContactPhone")}
                  type="text"
                  value={formData.receiverContactPhone}
                  onChange={(e) =>
                    onInputChange("receiverContactPhone", e.target.value)
                  }
                />
                <span className="flex mt-2">
                  <p>
                    Kami akan mengirimkan konfirmasi dan informasi perubahan
                    status pesanan ke WhatsApp kamu
                  </p>
                </span>

                {errors.receiverContactPhone && (
                  <p className="text-red-500 mt-[5px] mb-3">
                    {errors.receiverContactPhone.message}
                  </p>
                )}
              </>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
