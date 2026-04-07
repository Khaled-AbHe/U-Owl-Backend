import {
  Controller,
  Get,
  ParseFloatPipe,
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
    @Query('method') method: string,
    @Query('amount', ParseFloatPipe) amount: number,
  ) {
    return this.paymentService.payForCart(client.cart.cartId, method, amount);
  }

  @UseGuards(ClientGuard)
  @Get('/myCart')
  findClientCart(@CurrentUser() client: Client) {
    return this.cartsService.findById(client.cart.cartId);
  }
}
