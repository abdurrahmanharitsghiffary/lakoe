import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeaderCheckout } from "./card-header-checkout";
import { CardBodyCheckout } from "./card-body-checkout";
import { CardFooterCheckout } from "./card-footer-checkout";

export function TabsCheckout() {
  return (
    <div className="flex w-full px-2 mt-4 ml-10">
      <Tabs defaultValue="Pengiriman">
        <TabsList className="w-full bg-transparent p-0 ml-[-270px]">
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
        <div className="border-b-2 mt-4 ml-6 w-[945px]"></div>
        <TabsContent value="Pengiriman" className="mt-2">
          <CardHeaderCheckout />
          <CardBodyCheckout />
          <CardFooterCheckout />
        </TabsContent>
      </Tabs>
    </div>
  );
}
