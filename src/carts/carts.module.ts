import { Module } from '@nestjs/common';
import { CartsController } from './controller/carts/carts.controller';
import { CartsService } from './services/carts/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { PaymentService } from './services/payment/payment.service';
import { PaymentSystem } from './services/payment-system/payment-system.service';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { ReservationsController } from './controller/reservations/reservations.controller';
import { ReservationsService } from './services/reservations/reservations.service';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrderItem } from './entities/order-item.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    VehiclesModule,
    TypeOrmModule.forFeature([Cart, OrderItem, Payment]),
  ],
  exports: [CartsService, PaymentService, ReservationsService],
  controllers: [CartsController, ReservationsController],
  providers: [
    CartsService,
    PaymentService,
    PaymentSystem,
    ReservationsService,
    OrderItemsService,
  ],
})
export class CartsModule {}
