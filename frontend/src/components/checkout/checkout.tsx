import { RightCard } from "./right-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeaderCheckout } from "./card-header-checkout";
import { CardBodyCheckout } from "./card-body-checkout";
import { CardFooterCheckout } from "./card-footer-checkout";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import {
  addCheckoutSchema,
  FormCheckout,
} from "@/validator/checkout-validator";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function NewCheckout() {
  const checkout = useForm<FormCheckout>({
    resolver: zodResolver(addCheckoutSchema),
    defaultValues: {
      receiverContactName: "",
      receiverContactPhone: "",
      receiverDistrict: "",
      receiverCity: "",
      receiverProvince: "",
      receiverAddress: "",
      orderNote: "",
      receiverLatitude: "",
      receiverLongitude: "",
    },
  });

  const onSubmit = (data: FormCheckout) => {
    console.log("Form Data:", data);
  };

  const [formCheckout, setFormCheckout] = useState<FormCheckout>({
    receiverPostalCode: "",
    receiverContactName: "",
    addressDetails: "",
    receiverContactPhone: "",
    receiverDistrict: "",
    receiverCity: "",
    receiverProvince: "",
    receiverAddress: "",
    orderNote: "",
    receiverLatitude: "",
    receiverLongitude: "",
  });

  const handleInputChange = (name: keyof FormCheckout, value: string) => {
    setFormCheckout((prev) => ({ ...prev, [name]: value }));
    checkout.setValue(name, value);
  };

  const handleButtonClick = () => {
    console.log("App Data:", formCheckout);
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl p-8 font-bold">Checkout</h1>
      <FormProvider {...checkout}>
        <form onSubmit={checkout.handleSubmit(onSubmit)}>
          <div className="flex flex-row w-100 w-full p-4 gap-8">
            <div className="w-[70%]">
              <div className="w-full px-2 mt-4">
                <Tabs defaultValue="Pengiriman">
                  <TabsList className="bg-transparent p-0">
                    <TabsTrigger
                      value="Pengiriman"
                      className="relative border-b-4 border-b-transparent bg-transparent  pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary  data-[state=active]:shadow-none data-[state=active]:text-lakoe-primary justify-start"
                    >
                      <div className="flex flex-col w-full items-start gap-3">
                        <p className="text-[18px]">Langkah 1</p>
                        <p className="font-bold text-[20px] data-[state=active]:text-black-0">
                          Info Pengiriman
                        </p>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="Pembayaran"
                      className="relative border-b-4 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-lakoe-primary data-[state=active]:text-lakoe-primary data-[state=active]:shadow-none justify-start"
                    >
                      <div className="flex flex-col w-full items-start gap-3 ">
                        <p className="text-[18px]">Langkah 2</p>
                        <p className="font-bold text-[20px] data-[state=active]:text-black-0">
                          Metode Pembayaran
                        </p>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <div className="border-b-2 mt-4 w-full"></div>
                  <TabsContent value="Pengiriman" className="mt-2">
                    <CardHeaderCheckout
                      onInputChange={handleInputChange}
                      formData={formCheckout}
                    />
                    <CardBodyCheckout
                      onInputChange={handleInputChange}
                      formData={formCheckout}
                    />
                    <CardFooterCheckout
                      onInputChange={handleInputChange}
                      formData={formCheckout}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-[30%]">
              <RightCard
                onInputChange={handleInputChange}
                formData={formCheckout}
              />
              <div className="flex flex-row w-full h-auto mt-4">
                <Button
                  type="submit"
                  className="flex flex-row bg-blue-500 w-full gap-4 items-center py-7"
                  onClick={handleButtonClick}
                >
                  <span className="text-xl">Lihat Pembayaran</span>
                  <span>
                    <FaArrowRight className="h-6 w-6" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
