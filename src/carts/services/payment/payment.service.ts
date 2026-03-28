import { Injectable } from '@nestjs/common';
import type { PaymentStrategy } from 'src/interfaces/payment-strategy.interface.ts';

@Injectable()
export class PaymentService {
  private paymentStrategy: PaymentStrategy;

  constructor() {}

  setStrategy(strat: PaymentStrategy) {
    this.paymentStrategy = strat;
  }

  payment(amount: number) {
    return this.paymentStrategy.pay(amount);
  }
}
