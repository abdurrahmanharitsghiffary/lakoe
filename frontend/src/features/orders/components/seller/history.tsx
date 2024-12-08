import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrderTracking } from "../../api/get-order-tracking";
import moment from "moment";

type OrderHistoryProps = {
  orderId: string;
};

export function OrderHistory({ orderId }: OrderHistoryProps) {
  const { data: trackingData } = useGetOrderTracking({ id: orderId });

  const trackings = trackingData?.data ?? [];

  if (trackings?.length === 0) return null;

  return (
    <Collapsible>
      <div className="flex gap-1 text-sm font-semibold items-center justify-between text-lakoe-primary w-fit">
        Lihat riwayat pesanan
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 border rounded-md px-2">
        <div className="flex gap-4 p-2 px-4 text-sm items-center">
          <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {trackings.map((tracking) => (
              <li className="mb-4 ms-6">
                <span className="absolute flex items-center justify-center w-4 h-4 bg-lakoe-primary rounded-full -start-2 border-[var(--lakoe-primary-100)] border-2 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"></span>
                <h3 className="font-medium leading-tight text-black">
                  {tracking?.note}
                </h3>
                <p className="text-sm">
                  {moment(tracking?.updated_at).format("LLLL")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
