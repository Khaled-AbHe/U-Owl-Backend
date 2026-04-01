import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './services/cart/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { PaymentService } from './services/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  exports: [CartsService],
  controllers: [CartsController],
  providers: [CartsService, PaymentService],
})
export class CartsModule {}
