import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartsService } from './services/cart/carts.service';
import { PaymentService } from './services/payment/payment.service';
import { PaymentType } from './payment.enum';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';

@Controller('carts')
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private paymentService: PaymentService,
  ) {}

  @Get('/all')
  findAllCarts() {
    return this.cartsService.findAllCarts();
  }

  @Post('/pay')
  payCartTotal(
    @CurrentUser() client: Client,
    @Query('type') type: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    return this.paymentService.payForCart(client.cart.id, type, amount);
  }
}
