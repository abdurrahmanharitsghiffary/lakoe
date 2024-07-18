import { OrderList } from '@/components/order/order-list'
import {OrderTabs} from '@/components/order/order-tabs'
import {DeleteProduct} from "@/components/order/alert-delete"

export default function OrdersPage() {
  return (
    <div>
        <OrderTabs />
        <OrderList />
        <DeleteProduct/>
    </div>
  )
}
