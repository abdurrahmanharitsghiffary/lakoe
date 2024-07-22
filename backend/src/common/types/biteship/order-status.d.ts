export type OrderStatusEvent = {
  event: string;
  courier_tracking_id: string;
  courier_waybill_id: string;
  courier_company: string;
  courier_type: string;
  courier_driver_name: string;
  courier_driver_phone: string;
  courier_driver_photo_url: string;
  courier_driver_plate_number: string;
  courier_link: string;
  order_id: string;
  order_price: number;
  status: OrderStatus;
};

export type OrderPriceEvent = {
  cash_on_delivery_fee: number;
  courier_tracking_id: string;
  courier_waybill_id: string;
  event: string;
  order_id: string;
  price: number;
  proof_of_delivery_fee: number;
  shippment_fee: number;
  status: OrderStatus;
};

export type OrderWaybillIdEvent = {
  order_id: string;
  courier_tracking_id: string;
  courier_waybill_id: string;
  event: string;
  status: OrderStatus;
};

export type OrderStatus =
  | 'confirmed' // Order has been confirmed. Locating nearest driver to pick up.
  | 'allocated' // Courier has been allocated. Waiting to pick up.
  | 'pickingUp' // Courier is on the way to pick up item.
  | 'picked' // Item has been picked and ready to be shipped.
  | 'droppingOff' // Item is on the way to customer.
  | 'returnInTransit' // Order is on the way back to the origin.
  | 'onHold' // Your shipment is on hold at the moment. We'll ship your item after it's resolved.
  | 'delivered' // Item has been delivered.
  | 'rejected' // Your shipment has been rejected. Please contact Biteship for more information.
  | 'courierNotFound' // Your shipment is canceled because there's no courier available at the moment.
  | 'returned' // Order successfully returned.
  | 'cancelled' // Order is cancelled.
  | 'disposed'; // Order successfully disposed.
