import { PaymentStrategy } from 'src/interfaces/payment-strategy.interface';

export class PaypalStrategy implements PaymentStrategy {
  pay(amount: number) {
    console.log(`You payed ${amount}$ with your paypal!`);
  }
}
