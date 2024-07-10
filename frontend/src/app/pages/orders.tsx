import { OrderList } from '@/components/order/order-list'
import OrderTabs from '@/components/order/order-tabs'
import React from 'react'

export default function OrdersPage() {
  return (
    <div>
        <OrderTabs />
        <OrderList />
    </div>
  )
}
