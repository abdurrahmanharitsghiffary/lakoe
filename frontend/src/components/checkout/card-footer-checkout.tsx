import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { TiArrowSortedDown } from "react-icons/ti";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetSkus } from "@/hooks/use-checkout";
import { axios } from "@/lib/axios";

interface opsiPengirimanType {
  nama: string;
  harga: number;
  image: string;
  IsAvailableForCOD: boolean;
}

const opsiPengiriman: opsiPengirimanType[] = [
  {
    harga: 10000,
    image: "assets/logo-logistic/j&t.svg",
    IsAvailableForCOD: true,
    nama: "J&T",
  },
  {
    harga: 30000,
    image: "assets/logo-logistic/jne.svg",
    IsAvailableForCOD: false,
    nama: "JNE",
  },
  {
    harga: 50000,
    image: "assets/logo-logistic/sicepat.svg",
    IsAvailableForCOD: true,
    nama: "SiCepat",
  },
];

import { useGetStoreId } from "@/hooks/use-checkout";
import { FormCheckout } from "@/validator/checkout-validator";
import { ApiResponse } from "@/types/api-response";
import { Pricing } from "@/types/biteship";

export function CardFooterCheckout({
  formData,
  onInputChange,
}: {
  formData: FormCheckout;
  onInputChange: (name: keyof FormCheckout, value: any) => void;
}) {
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<
    opsiPengirimanType | undefined
  >(undefined);

  const [courierRates, setCourierRates] = useState<Pricing[]>([]);

  const skus = useGetSkus();
  const storeId = useGetStoreId();

  const handleGetCourierMethod = async () => {
    setIsSendOpen(true);
    console.log(formData, "FormData");
    const response = await axios.post<ApiResponse<Pricing[]>>(
      `/stores/${storeId}/shipping-rates`,
      {
        address: {
          ...formData,
          receiverAddressPhone: formData?.receiverContactPhone,
          receiverName: formData?.receiverContactName,
          receiverPostalCode: "16630",
        },
        skus: skus.map((sku) => ({ id: sku?.sku?.id, qty: sku?.qty })),
      }
    );
    const data = response?.data;
    console.log(data, "DATA");
    setCourierRates(data?.data ?? []);
  };

  console.log(courierRates);

  return (
    <div className="flex w-full mt-4 ">
      <Card className="flex w-full h-auto py-4">
        <div className="flex flex-col px-4 gap-2">
          <h1 className="text-2xl font-bold mx-3">Metode Pengiriman</h1>
          {!deliveryMethod ? (
            <Button
              onClick={handleGetCourierMethod}
              className="bg-blue-600 text-lg py-7 mx-3"
            >
              Pilih Metode Pengiriman
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => setIsSendOpen(true)}
              className="border-blue-300 py-10 mx-3"
            >
              <div className="flex w-full h-auto gap-4">
                <img src={deliveryMethod.image} className="h-[40px] mt-3" />
                <div className="flex flex-col w-full mt-[-5px] justify-center ">
                  <p>Nextday</p>
                  <p className="text-blue-600 text-lg">{deliveryMethod.nama}</p>
                  <p>1 Day Estimasi Pengiriman</p>
                </div>
                <div className="flex flex-row py-3 items-center">
                  <span className="text-blue-600 text-lg">
                    Rp.{deliveryMethod.harga}
                  </span>
                  <TiArrowSortedDown />
                </div>
              </div>
            </Button>
          )}

          <Dialog
            open={isSendOpen}
            onOpenChange={(open) => {
              setIsSendOpen(open);
            }}
          >
            <DialogContent className="flex-col sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex justify-center text-2xl w-full">
                  Metode Pengiriman
                </DialogTitle>
                <div className="border-b-2 w-full"></div>
                {/* <DialogTitle className="text-xl">Besok(2 hari)</DialogTitle>
                <DialogDescription className="flex w-100 text-lg">
                  Pembelian Diatas Jam 2 dikirim besok
                </DialogDescription> */}
              </DialogHeader>
              <RadioGroup className="px-4 space-y-4 ">
                {courierRates.map((data) => (
                  <Button
                    key={data?.company + data?.type}
                    onClick={() => {
                      setIsSendOpen(false);
                      onInputChange("courierCode", data?.company);
                      onInputChange("courierServiceCode", data?.type);

                      // console.log("ini data", data);
                      // setDeliveryMethod({
                      //   harga: data.harga,
                      //   image: data.image,
                      //   IsAvailableForCOD: data.IsAvailableForCOD,
                      //   nama: data.nama,
                      // });
                    }}
                    className="bg-white  h-20 hover:bg-blue-200 rounded-sm text-black-0"
                  >
                    <div className="flex items-center w-full space-x-4 ">
                      <RadioGroupItem
                        value={data?.company}
                        id={data?.company}
                        className="h-5 w-5 text-blue-500 border-blue-500"
                      />
                      <Label
                        htmlFor={data?.company}
                        className="flex flex-row w-full my-[-25px] justify-between items-center"
                      >
                        <div className="flex flex-row justify-between w-[200px]">
                          {/* <img src={data.image} alt="" className="h-[40px]" /> */}
                          <div className="flex capitalize flex-col gap-2 text-start">
                            <p className="text-lg text-black-0">
                              {data?.courier_name} {data?.duration}
                            </p>
                            <p className="text-md text-black-0">
                              {data?.courier_service_name}
                            </p>
                            <p className="text-md text-black-0">
                              {data?.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row ">
                          <p className="text-xl text-blue-500">
                            Rp.{data?.price}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </Button>
                ))}
              </RadioGroup>
            </DialogContent>
          </Dialog>
          <div className="flex flex-row px-3 items-center">
            <Checkbox id="terms" className="h-5 w-5" />
            <label
              htmlFor="terms"
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-3"
            >
              <h1 className="text-xl font-bold">Asuransi Pengiriman</h1>
              <p>Lindungi pesanan hanya dengan Rp0 </p>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
