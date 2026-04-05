import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartPaymentDto {
  @IsString()
  @IsNotEmpty()
  method: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
