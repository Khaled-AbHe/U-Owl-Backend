import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './services/cart/carts.service';
import { PaymentService } from './services/payment/payment.service';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';

@Controller('carts')
@UseGuards(AuthGuard)
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
