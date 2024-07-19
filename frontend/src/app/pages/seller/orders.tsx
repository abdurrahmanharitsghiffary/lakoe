import { OrderList } from "@/components/order/order-list";
import { OrderTabs } from "@/components/order/order-tabs";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";

export function OrdersPage() {
  return (
    <Card className="w-full">
      <Helmet>
        <title>Order</title>
      </Helmet>
      <OrderTabs />
      <OrderList />
    </Card>
  );
}
