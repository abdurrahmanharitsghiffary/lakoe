import { CardFooter } from "@/components/dashboard/seller/card-footer";
import { CardHeader } from "@/components/dashboard/seller/card-header";
import { TableOrder } from "@/components/dashboard/seller/table-order";

export function DashboardSeller() {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader />
      <CardFooter />
      <TableOrder />
    </div>
  );
}
