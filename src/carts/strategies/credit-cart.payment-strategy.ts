import { PaymentStrategy } from 'src/interfaces/payment-strategy.interface';

export class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number) {
    console.log(`You payed ${amount}$ with your credit card!`);
  }
}
