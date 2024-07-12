import { OrderList } from "@/components/order/order-list";
import { OrderTabs } from "@/components/order/order-tabs";
import { DeleteProduct } from "@/components/order/alert-delete";
import { Helmet } from "react-helmet-async";

export default function OrdersPage() {
  return (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <OrderTabs />
      <OrderList />
      <DeleteProduct />
    </div>
  );
}
