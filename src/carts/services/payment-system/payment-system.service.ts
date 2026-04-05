import { BadRequestException, Injectable } from '@nestjs/common';
import type { PaymentStrategy } from '../../interfaces/payment-strategy.interface.js';
import { Cart } from '../../entities/cart.entity';
import { PaymentType } from '../../enum/payment-type.enum.js';
import { CreditCardStrategy } from '../../strategies/credit-cart.payment-strategy.js';
import { PaypalStrategy } from '../../strategies/paypal.payment-strategy.js';

@Injectable()
export class PaymentSystem {
  private paymentStrategy: PaymentStrategy;

  setStrategy(method: string) {
    if (method == PaymentType.CREDIT_CARD) {
      this.paymentStrategy = new CreditCardStrategy();
    } else if (method == PaymentType.PAYPAL) {
      this.paymentStrategy = new PaypalStrategy();
    } else {
      throw new BadRequestException('Invalid payment method');
    }
  }

  async payment(amount: number, cart: Cart) {
    return await this.paymentStrategy.pay(amount, cart);
  }
}
