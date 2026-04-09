import { PaymentType } from '../enum/payment-type.enum';

export interface PaymentReceipt {
  paymentType: PaymentType;
  total: number;
  items: string[];
}
