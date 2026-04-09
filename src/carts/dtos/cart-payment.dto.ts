import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PaymentType } from '../enum/payment-type.enum';

export class CartPaymentDto {
  @IsEnum(PaymentType)
  @IsNotEmpty()
  method: PaymentType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
