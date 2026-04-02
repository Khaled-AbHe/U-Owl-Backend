import { Module } from '@nestjs/common';
import { CartsController } from './controller/carts/carts.controller';
import { CartsService } from './services/carts/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { PaymentService } from './services/payment/payment.service';
import { PaymentSystem } from './services/payment-system/payment-system.service';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { ReservationsController } from 'src/carts/controller/reservations/reservations.controller';
import { ReservationsService } from 'src/carts/services/reservations/reservations.service';

@Module({
  imports: [VehiclesModule, TypeOrmModule.forFeature([Cart])],
  exports: [CartsService, PaymentService, ReservationsService],
  controllers: [CartsController, ReservationsController],
  providers: [CartsService, PaymentService, PaymentSystem, ReservationsService],
})
export class CartsModule {}
