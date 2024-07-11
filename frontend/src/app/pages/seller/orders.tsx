import { OrderList } from "@/components/order/order-list";
import { OrderTabs } from "@/components/order/order-tabs";
import { DeleteProduct } from "@/components/order/alert-delete";
import { Card } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <>
      <Card>
        <OrderTabs />
        <OrderList />
        <DeleteProduct />
      </Card>
    </>
  );
}
