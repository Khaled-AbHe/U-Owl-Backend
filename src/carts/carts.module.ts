import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './services/cart/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { PaymentService } from './services/payment/payment.service';
import { Client } from 'src/users/entities/client.entity';
import { Vehicule } from 'src/vehicules/entities/vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Client, Vehicule])],
  exports: [CartsService],
  controllers: [CartsController],
  providers: [CartsService, PaymentService],
})
export class CartsModule {}