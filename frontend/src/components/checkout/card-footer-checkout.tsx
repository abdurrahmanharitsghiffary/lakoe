import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { TiArrowSortedDown } from "react-icons/ti";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetSkus } from "@/hooks/use-checkout";
import { axios } from "@/lib/axios";

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
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [courierRates, setCourierRates] = useState<Pricing[]>([]);
  const [error, setError] = useState(null);
  console.log(error, "err");
  const skus = useGetSkus();
  const storeId = useGetStoreId();

  const selectedCourier = courierRates.find((rate) => {
    const [company, type] = deliveryMethod.split(":");
    return rate?.company === company && rate?.type === type;
  });

  const handleGetCourierMethod = async () => {
    setIsSendOpen(true);

    try {
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
    } catch (err) {
      setError(err?.response?.data);
    }
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
                {/* <img src={deliveryMethod.image} className="h-[40px] mt-3" /> */}
                <div className="flex flex-col w-full mt-[-5px] justify-center ">
                  <p>Estimasi pengiriman {selectedCourier?.duration}</p>
                  <p>{selectedCourier?.courier_service_name}</p>
                  <p className="text-blue-600 text-lg">
                    {selectedCourier?.courier_name}
                  </p>
                </div>
                <div className="flex flex-row py-3 items-center">
                  <span className="text-blue-600 text-lg">
                    Rp.{selectedCourier?.price}
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
              <RadioGroup
                className="px-4 space-y-4"
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
              >
                {error
                  ? error?.message
                  : courierRates.map((data) => (
                      <Button
                        key={data?.company + data?.type}
                        onClick={() => {
                          setIsSendOpen(false);
                          onInputChange("courierCode", data?.company);
                          onInputChange("courierServiceCode", data?.type);
                        }}
                        className="bg-white rounded-xl h-20 hover:bg-blue-200 text-black-0 py-2"
                      >
                        <div className="flex items-center w-full space-x-4">
                          <RadioGroupItem
                            value={data?.company + ":" + data?.type}
                            id={data?.company}
                            className="h-5 w-5 text-blue-500 border-blue-500"
                          />
                          <Label
                            htmlFor={data?.company}
                            className="flex flex-row w-full justify-between items-center"
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
