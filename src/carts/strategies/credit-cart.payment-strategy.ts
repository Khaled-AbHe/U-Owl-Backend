import { PaymentStrategy } from 'src/interfaces/payment-strategy.interface';

export class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number): string {
    return `You payed ${amount}$ with your credit card!`;
  }
}
