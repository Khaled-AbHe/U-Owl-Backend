import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PaymentSystem } from '../payment-system/payment-system.service';
import { PaymentType } from '../../enum/payment.enum';
import { CreditCardStrategy } from '../../strategies/credit-cart.payment-strategy';
import { PaypalStrategy } from '../../strategies/paypal.payment-strategy';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class PaymentService {
  constructor(
    private paymentSystem: PaymentSystem,
    private cartsService: CartsService,
  ) {}

  async payForCart(cartId: number, method: string, amount: number) {
    const cart = await this.cartsService.findById(cartId);

    if (await this.cartsService.isEmpty(cart.cartId)) {
      throw new ForbiddenException('Cart is empty');
    }

    if (amount > cart.totalPrice) {
      throw new BadRequestException("You're paying too much!");
    } else if (amount < cart.totalPrice) {
      throw new BadRequestException('Not enough funds to pay for cart');
    }

    if (method == PaymentType.CREDIT_CARD) {
      this.paymentSystem.setStrategy(new CreditCardStrategy());
    } else if (method == PaymentType.PAYPAL) {
      this.paymentSystem.setStrategy(new PaypalStrategy());
    }

    const bill = this.paymentSystem.payment(amount, cart);
    await this.cartsService.clearCart(cartId);
    return bill;
  }
}
