import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './services/cart/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { PaymentService } from './services/payment/payment.service';
import { PaymentSystem } from './payment-system.service';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule, TypeOrmModule.forFeature([Cart])],
  exports: [CartsService, PaymentService],
  controllers: [CartsController],
  providers: [CartsService, PaymentService, PaymentSystem],
})
export class CartsModule {}
