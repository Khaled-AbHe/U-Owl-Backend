import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from 'src/carts/services/carts/carts.service';
import { PaymentService } from 'src/carts/services/payment/payment.service';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { ClientGuard } from 'src/currentUser/guards/client.guard';

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

  @UseGuards(ClientGuard)
  @Post('/pay')
  payCartTotal(
    @CurrentUser() client: Client,
    @Query('type') type: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    return this.paymentService.payForCart(client.cart.cartId, type, amount);
  }
}
