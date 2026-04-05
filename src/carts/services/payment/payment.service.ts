import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaymentSystem } from '../payment-system/payment-system.service';
import { CartsService } from '../carts/carts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { Client } from '../../../users/entities/client.entity';
import { PaymentType } from '../../enum/payment-type.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private paymentSystem: PaymentSystem,
    private cartsService: CartsService,
  ) {}

  async createPayment(data: {
    client: Client;
    paymentType: PaymentType;
    total: number;
    items: string[];
  }) {
    return await this.paymentRepo.save(this.paymentRepo.create(data));
  }

  async payForCart(client: Client, method: string, amount: number) {
    this.paymentSystem.setStrategy(method);
    const cart = await this.cartsService.findById(client.cart.cartId);

    if (await this.cartsService.isEmpty(cart.cartId)) {
      throw new ForbiddenException('Cart is empty');
    }

    const receipt = await this.paymentSystem.payment(amount, cart);
    await this.cartsService.clearCart(cart);
    return await this.createPayment({ ...receipt, client });
  }
}
