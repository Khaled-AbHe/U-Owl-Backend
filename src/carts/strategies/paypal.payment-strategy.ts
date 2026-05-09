import { BadRequestException } from '@nestjs/common';
import { Cart } from '../entities/cart.entity';
import { PaymentReceipt } from '../interfaces/payment-receipt.interface';
import { PaymentStrategy } from '../interfaces/payment-strategy.interface';
import { PaymentType } from '../enum/payment-type.enum';

export class PaypalStrategy implements PaymentStrategy {
  async pay(clientAmount: number, cart: Cart): Promise<PaymentReceipt> {
    if (clientAmount > cart.totalPrice) {
      throw new BadRequestException("You're paying too much!");
    } else if (clientAmount < cart.totalPrice) {
      throw new BadRequestException('Not enough funds to pay for cart');
    }

    console.log(`You payed ${clientAmount}$ with your paypal!`);

    const receipt: PaymentReceipt = {
      paymentType: PaymentType.PAYPAL,
      items: cart.orderItems.map((item) => {
        return `[${item.vehicle.licensePlate}] ${item.vehicle.vehicleSubtype} ${item.vehicle.vehicleType}: ${item.itemPrice}$`;
      }),
      total: cart.totalPrice,
    };

    return receipt;
  }
}
