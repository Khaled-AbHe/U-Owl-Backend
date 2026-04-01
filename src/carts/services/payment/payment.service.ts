import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaymentSystem } from 'src/carts/payment-system.service';
import { PaymentType } from 'src/carts/payment.enum';
import { CreditCardStrategy } from 'src/carts/strategies/credit-cart.payment-strategy';
import { PaypalStrategy } from 'src/carts/strategies/paypal.payment-strategy';
import { CartsService } from '../cart/carts.service';

@Injectable()
export class PaymentService {
  constructor(
    private paymentSystem: PaymentSystem,
    private cartsService: CartsService,
  ) {}

  async payForCart(id: number, method: string, amount: number) {

    if (await this.cartsService.isEmpty(id)) {
      throw new ForbiddenException("Cart is empty")
    }

    if (method == PaymentType.CREDIT_CARD) {
      this.paymentSystem.setStrategy(new CreditCardStrategy());
    } else if (method == PaymentType.PAYPAL) {
      this.paymentSystem.setStrategy(new PaypalStrategy());
    }

    this.cartsService.clearCart(id);

    return this.paymentSystem.payment(amount);
  }
}
