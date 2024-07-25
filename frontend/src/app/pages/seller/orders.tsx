import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Order } from "@/components/order/order-card";

export function OrdersPage() {
  return (
    <Card className="w-full">
      <Helmet>
        <title>Order</title>
      </Helmet>
      <Order/>
    </Card>
  );
}
