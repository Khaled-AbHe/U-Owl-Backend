import { Injectable } from '@nestjs/common';
import type { PaymentStrategy } from 'src/interfaces/payment-strategy.interface.ts';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class PaymentSystem {
  private paymentStrategy: PaymentStrategy;

  constructor() {}

  setStrategy(strat: PaymentStrategy) {
    this.paymentStrategy = strat;
  }

  payment(amount: number, cart: Cart) {
    this.paymentStrategy.pay(amount);
    return {
      Items: cart.orderItems.map((item) => {
        return `[${item.vehicle.licencePlate}] ${item.vehicle.vehicleSubtype} ${item.vehicle.vehicleType}: ${item.itemPrice}$`;
      }),
      'Total Payed': `${amount}$`,
    };
  }
}
