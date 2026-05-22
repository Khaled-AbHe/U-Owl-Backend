import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CartsService } from '../../services/carts/carts.service';
import { PaymentService } from '../../services/payment/payment.service';
import { CurrentUser } from '../../../currentUser/decorators/current-user.decorator';
import { Client } from '../../../users/entities/client.entity';
import { AuthGuard } from '../../../currentUser/guards/auth.guard';
import { ClientGuard } from '../../../currentUser/guards/client.guard';
import { CartPaymentDto } from '../../dtos/cart-payment.dto';
import { AdminGuard } from '../../../currentUser/guards/admin.guard';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private paymentService: PaymentService,
  ) {}

  @UseGuards(AdminGuard)
  @Get('/all')
  findAllCarts() {
    return this.cartsService.findAllCarts();
  }

  @UseGuards(ClientGuard)
  @Post('/pay')
  payCartTotal(@CurrentUser() client: Client, @Body() body: CartPaymentDto) {
    return this.paymentService.payForCart(client, body.method, body.amount);
  }

  @UseGuards(ClientGuard)
  @Get('/currentCart')
  findClientCart(@CurrentUser() client: Client) {
    return this.cartsService.findById(client.cart.cartId);
  }
}
