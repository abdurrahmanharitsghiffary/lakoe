import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "../image";

interface OrderProps {
  status: keyof typeof status;
  invoice: string;
  name: string;
  variant: string;
  size: string;
  image: string;
  totalItem: number;
  totalPrice: number;
}

export const status = {
  belum: {
    label: "Belum Dibayar",
    cn: "#e8c600",
    buttonLabel: "Hubungi Pembeli",
  },
  pesanBaru: {
    label: "Pesanan Baru",
    cn: "#008f5d",
    buttonLabel: "Proses Pesanan",
  },
  siapDikirim: {
    label: "Siap Dikirim",
    cn: "#147af3",
    buttonLabel: "Kabari Pembeli",
  },
  dalamPengiriman: {
    label: "Dalam Pengiriman",
    cn: "#f68511",
    buttonLabel: "Lihat Rincian Pengiriman",
  },
  pesananSelesai: {
    label: "Pesanan Selesai",
    cn: "#ffffff",
    buttonLabel: "Hubungi Pembeli",
  },
  dibatalkan: { label: "Dibatalkan", cn: "#ea3829", buttonLabel: "" },
};

export function OrderComponent({
  status: statusKey,
  invoice,
  name,
  variant,
  size,
  image,
  totalItem,
  totalPrice,
}: OrderProps) {
  const handleSubmit = () => {
    // Logic for order submission
  };

  const { label, cn, buttonLabel } = status[statusKey];

  return (
    <Card className="overflow-hidden flex justify-center min-h-[150px]">
      <div className="w-full">
        <CardHeader className="items-left bg-gray-50 p-3">
          <div className="flex justify-between">
            <div className="flex-shrink-0">
              <p
                className=" px-3 w-fit text-white rounded-sm h-7 flex justify-center pb-7 mt-1 text-base"
                style={{ backgroundColor: cn }}
              >
                {label}
              </p>
              <p className="text-gray-500 mt-2 text-sm pb-1">{invoice}</p>
            </div>

            {buttonLabel && (
              <Button
                className="py-2 px-4 text-black bg-white rounded-full border border-gray-300 mb-5 hover:bg-gray-200 hover:border-gray-400 hover:text-black"
                onClick={handleSubmit}
              >
                {buttonLabel}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="!p-4 flex justify-end border-t border-grey-300 pt-1">
          <div className="flex items-center mr-auto">
            <Image
              src={image}
              alt={name}
              className="aspect-square h-[50px] w-[50px] object-center object-cover"
            />
            <div className="ml-4">
              <CardTitle className="text-base font-bold font-size-500 text-gray-900">
                {name} | {variant} - {size}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {totalItem} Barang
              </CardDescription>
            </div>
          </div>

          <div>
            <p className="text-base text-gray-500">Total belanja</p>
            <p className="text-base font-semibold text-gray-900">
              Rp{totalPrice}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
