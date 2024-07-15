import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableOrderHeader } from "./select-table-order";
interface OrderProps {
  id: number;
  name: string;
  invoice: string;
  status: string;
  variant: string;
  size: string;
  image: string;
  totalItem: number;
  totalPrice: number;
}

export function TableOrder() {
  const orders: OrderProps[] = [
    {
      id: 1,
      name: "Basic cotton kenary",
      invoice: "1234",
      status: "dalamPengiriman",
      variant: "Black Mamba",
      size: "L",
      image:
        "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
      totalItem: 0,
      totalPrice: 0,
    },
    {
      id: 1,
      name: "Kaos",
      invoice: "1234",
      status: "belum",
      variant: "Black",
      size: "L",
      image:
        "https://s3-ap-southeast-1.amazonaws.com/cdn.jarvis-store.com/harga-kaos-upload/produk/large/20170126-140843.jpg",
      totalItem: 0,
      totalPrice: 0,
    },
  ];
  return (
    <div className="flex flex-col w-100 gap-4">
      <div className="flex flex-col w-100">
        <TableOrderHeader />
      </div>
      <Table className="bg-white w-[955px]">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Total Item</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.invoice}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.variant}</TableCell>
              <TableCell>{order.size}</TableCell>
              <TableCell>{order.totalItem}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
