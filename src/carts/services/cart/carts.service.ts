import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entity';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { CreditCardStrategy } from 'src/carts/strategies/credit-cart.payment-strategy';
import { PaypalStrategy } from 'src/carts/strategies/paypal.payment-strategy';
import { PaymentType } from 'src/carts/payment.enum';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
    private paymentService: PaymentService,
  ) {}

  async findAllCarts() {
    return await this.repo.find();
  }

  payForCart(method: string, amount: number) {
    if (method == PaymentType.CREDIT_CARD)
      this.paymentService.setStrategy(new CreditCardStrategy());
    else if (method == PaymentType.PAYPAL)
      this.paymentService.setStrategy(new PaypalStrategy());
    return this.paymentService.payment(amount);
  }
}
