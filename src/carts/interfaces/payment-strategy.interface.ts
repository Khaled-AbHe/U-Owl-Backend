import { Cart } from '../entities/cart.entity';
import { PaymentReceipt } from './payment-receipt.interface';

export interface PaymentStrategy {
  pay(clientAmount: number, cart: Cart): Promise<PaymentReceipt>;
}
