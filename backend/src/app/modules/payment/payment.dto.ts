export class PaymentDto {
  orderId: string;
}

export interface MidtransNotification {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  bank: string;
  card_type: string;
  va_number?: string;
}

export class PaymentId {
  id: number;
}
