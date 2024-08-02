import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { ButtonCopy } from "../button/copy";
import { BsCopy } from "react-icons/bs";
import { Card } from "../ui/card";
import { useGetOrderTracking } from "@/features/orders/api/get-order-tracking";
import { useGetOrder } from "@/features/orders/api/get-order";
import { ORDER_STATUS_LABEL } from "@/constants";
import moment from "moment";

type TrackingDialogProps = {
  isOpen: boolean;
  orderId: string;
  onOpen: (isOpen: boolean) => void;
};

export function TrackingDialog({
  isOpen,
  onOpen,
  orderId,
}: TrackingDialogProps) {
  const { data } = useGetOrder({ id: orderId });

  const order = data?.data;

  const { data: trackingData } = useGetOrderTracking({ id: orderId });

  const trackings = trackingData?.data ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent className="text-sm">
        <DialogHeader>
          <DialogTitle>Lacak Pengiriman</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 basis-1/2">
            <div className="flex flex-col gap-1">
              <p>Kurir</p>
              <p className="font-semibold capitalize">
                {order?.courier?.courierCode}{" "}
                {order?.courier?.courierServiceCode}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>
                No Resi{" "}
                <ButtonCopy
                  text={order?.courier?.biteshipWaybillId ?? "-"}
                  className="w-6 h-6"
                  size="icon"
                  variant="ghost"
                >
                  <BsCopy />
                </ButtonCopy>
              </p>
              <p className="font-semibold">
                {order?.courier?.biteshipWaybillId ?? "-"}
              </p>
            </div>
            {/* <div className="flex flex-col gap-1">
              <p>Pengirim</p>
              <p className="font-semibold">{order?.invoice}</p>
            </div> */}
          </div>
          <div className="flex flex-col gap-2 basis-1/2">
            <div className="flex flex-col gap-1">
              <p>Penerima</p>
              <p className="font-semibold">
                {order?.invoice?.receiverContactName}
              </p>
              <p>{order?.invoice?.receiverAddress}</p>
            </div>
          </div>
        </div>
        <p>
          Status:{" "}
          <span className="font-semibold">
            {ORDER_STATUS_LABEL[order?.status ?? "NEW_ORDER"]}
          </span>
        </p>
        {trackings?.length > 0 ? (
          <Card>
            <section className="p-4">
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
            </section>
          </Card>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
