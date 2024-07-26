import { useOrders } from "@/hooks/use-orders";
import { OrderComponent } from "./order";

// interface IOrder {
//   id: number;
//   name: string;
//   invoice: string;
//   status: keyof typeof status;
//   variant: string;
//   size: string;
//   image: string;
//   totalItem: number;
//   totalPrice: number;
// }

// const orders: IOrder[] = [
//   {
//     id: 1,
//     name: "BASIC COTTON KENNARY",
//     invoice: "INV/1234/ASDF",
//     status: "dalamPengiriman",
//     variant: "BLACK COLOR",
//     size: "L",
//     image:
//       "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
//     totalItem: 5,
//     totalPrice: 100000,
//   },
//   {
//     id: 1,
//     name: "LUXURY GUCCI BAG",
//     invoice: "INV/1234/ASDF",
//     status: "belum",
//     variant: "BLACK PINK T-SHIRT",
//     size: "L",
//     image:
//       "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
//     totalItem: 4,
//     totalPrice: 180000,
//   },
//   {
//     id: 1,
//     name: "LUXURY DIOR DRESS",
//     invoice: "INV/1234/ASDF",
//     status: "siapDikirim",
//     variant: "MUSTARD GREEN TEA",
//     size: "L",
//     image:
//       "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
//     totalItem: 4,
//     totalPrice: 180000,
//   },
//   {
//     id: 1,
//     name: "Baju anak Perempuan",
//     invoice: "INV/1234/ASDF",
//     status: "dibatalkan",
//     variant: "Pink",
//     size: "L",
//     image:
//       "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
//     totalItem: 4,
//     totalPrice: 180000,
//   },
// ];
export function OrderList({ storeId }: { storeId: string }) {
  const { orders } = useOrders(storeId);
  console.log("get:", orders);
  return (
    <div className="flex flex-col gap-2 p-2">
      {(orders?.data ?? []).map((order: any) => (
        <OrderComponent
          name={order.name}
          invoice={order.invoice}
          status={order.status}
          variant={order.variant}
          size={order.size}
          image={order.image}
          totalItem={order.totalItem}
          totalPrice={order.totalPrice}
        />
      ))}
    </div>
  );
}
